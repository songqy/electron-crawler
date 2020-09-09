import config from '@/main/config';
import utils from '@/main/common/utils';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';
import httpRequest from '@/main/modal/httpRequest';
import { mkdir, writeFile } from '@/main/modal/file';
import { savePicList } from '@/main/service/savePic';
import logger from '@/main/common/logger';

const baseUrl = config.baseUrl2;

interface newEndResponse {
    newEnd: number,
    stop: boolean,
}

const saveInfo = async ($: CheerioStatic, file: string): Promise<void> => {
  // 获取title
  const title = $('.article-title').html() || '';
  const desc = ($('.article-content').html() || '').replace(/<[^>]+>/g, '');
  const infoJson = {
    title,
    desc,
  };
  const fileName = file + '/info.json';
  await writeFile(fileName, JSON.stringify(infoJson));
};

const getImgSrcList = ($: CheerioStatic, imgList: Cheerio, imgSrcList: string[]) => {
  for (let i = 0; i < imgList.length; ++i) {
    // 部分Url中会出现空格，需要过滤掉空格
    let imgUrl = ($(imgList).eq(i).attr('src') || '').trim();
    imgUrl = imgUrl.split(' ')[0];
    imgSrcList.push(imgUrl);
  }
};

const parseImgSrcList = async(url: string, imgSrcList: string[], file: string, cnt = 1): Promise<boolean> => {
  logger.log(url);
  const htmlBuffer = await httpRequest.httpGetHtml(url);
  if (!htmlBuffer) {
    //停止操作
    return false;
  }
  const html = iconv.decode(htmlBuffer, 'gb2312');
  //解决中文乱码问题
  const $ = cheerio.load(html, { decodeEntities: false });

  const $imgList = $('.content-wrap p>img');
  if (!$imgList || $imgList.length <= 0) {
    return false;
  }

  if (cnt === 1) {
    await mkdir(file);

    const htmlFile = file + '/www_1.html';
    writeFile(htmlFile, html);
    // 保存简介
    saveInfo($, file);
  }

  getImgSrcList($, $imgList, imgSrcList);

  return true;
};

const nextPage = async(href: string, startIndex: number, file: string, imgSrcList: string[], cnt = 2) => {
  const nextUrl = baseUrl + href + startIndex + '_' + cnt + '.html';

  const flag = await parseImgSrcList(nextUrl, imgSrcList, file, cnt);
  if (!flag) return;

  await utils.sleep(config.pageInterval);

  await nextPage(href, startIndex, file, imgSrcList, cnt + 1);
};

const startPage = async(href: string, startIndex: number, baseFile: string): Promise<void> => {
  const imgSrcList: string[] = [];
  const file = baseFile + startIndex;
  const url = `${baseUrl}${href}${startIndex}.html`;
  const flag = await parseImgSrcList(url, imgSrcList, file);
  if (!flag) return;

  logger.log(startIndex);


  await nextPage(href, startIndex, file, imgSrcList);

  // logger.log(imgSrcList);

  await savePicList(imgSrcList, file, baseUrl);
};

const getPageUrl = async(url: string, baseFile: string, end: number, search = 0):Promise<newEndResponse> => {
  const htmlBuffer = await httpRequest.httpGetHtml(url);
  if (!htmlBuffer) {
    return {
      newEnd: end,
      stop: true,
    };
  }
  const html = iconv.decode(htmlBuffer, 'gb2312');
  //解决中文乱码问题
  const $ = cheerio.load(html, { decodeEntities: false });

  const list = $('.excerpt-one .thumbnail');
  const urlList: string[] = [];
  for (let i = 0, len = list.length; i < len; ++i) {
    urlList.push($(list).eq(i).attr('href') || '');
  }

  writeFile(baseFile + 'page_url.json', JSON.stringify(urlList));

  const reg1 = new RegExp(/\/[0-9]{4}\./);
  const reg2 = new RegExp(/\/(.+)\/(.+)\/(.+)\//);
  let newEnd = 0;
  for (const urlItem of urlList) {
    const r1 = reg1.exec(urlItem);
    const r2 = reg2.exec(urlItem);
    if (!r1 || !r2) {
      return {
        newEnd: newEnd || end,
        stop: true,
      };
    }
    const index = Number(r1[0].substr(1, 4));
    const href = r2[0];
    logger.log(index);
    if (newEnd === 0) {
      newEnd = index;
    }
    if (search > 0) {
      if (index > search) {
        logger.log(`${index} pass`);
        continue;
      } else if (index < search) {
        return {
          newEnd,
          stop: true,
        };
      }
    } else {
      if (index <= end) {
        return {
          newEnd,
          stop: true,
        };
      }
    }

    await startPage(href, index, baseFile);

    await utils.sleep(config.pageInterval);
  }

  return {
    newEnd,
    stop: false,
  };
};

const nextIndexPage = async(baseFile: string, end: number, cnt = 2, search = 0)  => {
  const url = baseUrl + '/page/' + cnt + '.html';
  const { stop } = await getPageUrl(url, baseFile, end, search);
  if (!stop) {
    await nextIndexPage(baseFile, end, cnt + 1, search);
  }
};

const startIndexPage = async(baseFile: string, end: number, search = 0) => {
  const { newEnd, stop } = await getPageUrl(baseUrl, baseFile, end, search);

  if (!stop) {
    await nextIndexPage(baseFile, end, 2, search);
  }

  return newEnd;
};

export const crawler2 = async(end2: number, baseFile: string):Promise<number> => {
  if (!config.crawlerS2) {
    return end2;
  }
  const newEnd = await startIndexPage(baseFile, end2);

  return newEnd;
};
