import config from '../config';
import utils from '../common/utils';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';
import httpRequest from '../modal/httpRequest';
import { mkdir, writeFile } from '../modal/file';
import { savePicList } from '../service/savePic';

const baseUrl = config.baseUrl2;

const saveInfo = async ($: CheerioStatic, file: string): Promise<void> => {
  // 获取title
  const title = $('.article-title').html();
  const desc = ($('.article-content').html() || '').replace(/<[^>]+>/g, '');
  const infoJson = {
    title: title,
    desc: desc,
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

const nextPage = async(href: string, startIndex: number, file: string, imgSrcList: string[], cnt = 2) => {
  const nextUrl = baseUrl + href + startIndex + '_' + cnt + '.html';
  console.log(nextUrl);

  let html = await httpRequest.httpGetHtml(nextUrl);
  if (!html) {
    //停止操作
    return;
  }
  html = iconv.decode(html, 'gb2312');
  //解决中文乱码问题
  const $ = cheerio.load(html, { decodeEntities: false });

  const $imgList = $('.content-wrap p>img');
  if (!$imgList || $imgList.length <= 0) {
    return;
  }

  getImgSrcList($, $imgList, imgSrcList);

  // let htmlFile = file + '/www_' + cnt + '.html';
  // this.fileService.write(htmlFile, html);

  await utils.sleep(config.pageInterval);

  await nextPage(href, startIndex, file, imgSrcList, cnt + 1);
};

const startPage = async(href: string, startIndex: number, baseFile: string): Promise<void> => {
  const url = `${baseUrl}${href}${startIndex}.html`;
  let html = await httpRequest.httpGetHtml(url);
  if (!html) {
    //停止操作
    return;
  }
  html = iconv.decode(html, 'gb2312');
  //解决中文乱码问题
  const $ = cheerio.load(html, { decodeEntities: false });
  console.log(startIndex);

  const file = baseFile + startIndex;
  await mkdir(file);

  const htmlFile = file + '/www_1.html';
  writeFile(htmlFile, html);

  const $imgList = $('.content-wrap p>img');
  if (!$imgList || $imgList.length <= 0) {
    //停止操作
    return;
  }
  // 保存简介
  saveInfo($, file);

  const imgSrcList: string[] = [];
  getImgSrcList($, $imgList, imgSrcList);


  await nextPage(href, startIndex, file, imgSrcList);

  // console.log(imgSrcList);

  await savePicList(imgSrcList, file, baseUrl);
};

const  nextIndexPage = async(file: string, end: number, cnt = 2, search = 0)  => {
  const url = baseUrl + '/page/' + cnt + '.html';
  let html = await httpRequest.httpGetHtml(url);
  html = iconv.decode(html, 'gb2312');
  //解决中文乱码问题
  const $ = cheerio.load(html, { decodeEntities: false });

  // let htmlFile = file + '/www_index.html';
  // this.fileService.write(htmlFile, html);

  const list = $('.excerpt-one .thumbnail');
  const urlList: string[] = [];
  for (let i = 0, len = list.length; i < len; ++i) {
    urlList.push($(list).eq(i).attr('href') || '');
  }

  writeFile(file + '/page_url.json', JSON.stringify(urlList));


  const reg1 = new RegExp(/\/[0-9]{4}\./);
  const reg2 = new RegExp(/\/(.+)\/(.+)\/(.+)\//);
  for (const urlItem of urlList) {
    const r1 = reg1.exec(urlItem);
    const r2 = reg2.exec(urlItem);
    const index = Number(r1[0].substr(1, 4));
    const href = r2[0];
    console.log(index);

    if (search > 0) {
      if (index > search) {
        console.log(index + ' pass');
        continue;
      } else if (index < search) {
        return;
      }
    } else {
      if (index <= end) {
        return;
      }
    }

    await startPage(href, index, file);

    await utils.sleep(config.pageInterval);
  }

  await nextIndexPage(file, end, cnt + 1, search);

};

const getPageUrl = async(file: string, end: number, search = 0):Promise<number> => {
  const url = baseUrl;
  let html = await httpRequest.httpGetHtml(url);
  html = iconv.decode(html, 'gb2312');
  //解决中文乱码问题
  const $ = cheerio.load(html, { decodeEntities: false });

  const htmlFile = file + 'www_index.html';
  writeFile(htmlFile, html);

  const list = $('.excerpt-one .thumbnail');
  const urlList: string[] = [];
  for (let i = 0, len = list.length; i < len; ++i) {
    urlList.push($(list).eq(i).attr('href') || '');
  }

  writeFile(file + 'page_url.json', JSON.stringify(urlList));

  const reg1 = new RegExp(/\/[0-9]{4}\./);
  const reg2 = new RegExp(/\/(.+)\/(.+)\/(.+)\//);
  let newEnd = 0;
  for (const urlItem of urlList) {
    const r1 = reg1.exec(urlItem);
    const r2 = reg2.exec(urlItem);
    const index = Number(r1[0].substr(1, 4));
    const href = r2[0];
    console.log(index);
    if (newEnd === 0) {
      newEnd = index;
    }
    if (search > 0) {
      if (index > search) {
        console.log(`${index} pass`);
        continue;
      } else if (index < search) {
        return newEnd;
      }
    } else {
      if (index <= end) {
        return newEnd;
      }
    }

    await startPage(href, index, file);

    await utils.sleep(config.pageInterval);
  }

  await nextIndexPage(file, end, 2, search);

  return newEnd;
};

export const crawler2 = async(end2: number, baseFile: string,):Promise<number> => {
  if (!config.crawlerS2) {
    return end2;
  }
  const newEnd = await getPageUrl(baseFile, end2);

  return newEnd;
};
