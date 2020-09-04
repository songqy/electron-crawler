import config from '@/main/config';
import utils from '@/main/common/utils';
import cheerio from 'cheerio';
import httpRequest from '@/main/modal/httpRequest';
import { mkdir, writeFile } from '@/main/modal/file';
import { savePicList } from '@/main/service/savePic';
import logger from '@/main/common/logger';

const baseUrl = config.baseUrl1;

// 保存简介
const saveInfo = async($: CheerioStatic, file: string): Promise<void> => {
  const title = $('#htilte').html();
  const desc = $('#ddesc').html();
  const infoJson = {
    title: title,
    desc: desc,
  };
  const fileName = file + '/info.json';
  await writeFile(fileName, JSON.stringify(infoJson));
};

// 解析html
const parseHtml = (_baseUrl: string, $: CheerioStatic) => {
  const imgSrcList: string[] = [];
  const nextUrl = `${_baseUrl}${$('.a1').eq(1).attr('href') || ''}`;
  logger.log(nextUrl);

  const $imgList = $('#hgallery').find('img');
  for (let i = 0, len = $imgList.length; i < len; ++i) {
    imgSrcList.push($($imgList).eq(i).attr('src') || '');
  }

  return { nextUrl, imgSrcList };
};

//下个页面
const nextPage = async(url: string): Promise<string[]> => {
  if (url.indexOf('html') < 0) {
    return [];
  }
  const html = await httpRequest.httpGetHtml(url);
  if (!html) {
    //停止操作
    return [];
  }
  //解决中文乱码问题
  const $ = cheerio.load(html, { decodeEntities: false });

  const { nextUrl, imgSrcList } = parseHtml(baseUrl, $);

  await utils.sleep(config.pageInterval);

  const newImgSrcList = await nextPage(nextUrl);
  imgSrcList.push(...newImgSrcList);
  return imgSrcList;
};

const startPage = async(startIndex: number, baseFile: string) => {
  const url = `${baseUrl}/g/${startIndex}/`;
  const html = await httpRequest.httpGetHtml(url);
  if (!html) {
    //停止操作
    return false;
  }

  //解决中文乱码问题
  const $ = cheerio.load(html, { decodeEntities: false });

  const $imgList = $('#hgallery').find('img');
  if (!$imgList || $imgList.length <= 0) {
    //停止操作
    return false;
  }

  logger.log(startIndex);

  const file = `${baseFile}${startIndex}`;
  await mkdir(file);

  // 保存简介
  saveInfo($, file);

  const htmlFile = file + '/www_1.html';
  writeFile(htmlFile, html);

  const { nextUrl, imgSrcList } = parseHtml(baseUrl, $);

  const newImgSrcList = await nextPage(nextUrl);
  imgSrcList.push(...newImgSrcList);

  //logger.log(imgSrcList);

  await savePicList(imgSrcList, file, url);

  return true;
};

const startCrawler = async(start: number, baseFile: string): Promise<number> => {
  let newStart = start;
  let skipCount = 0;
  for (let i = start; i < start + 100; ++i) {
    const flag = await startPage(i, baseFile);
    if (flag) {
      newStart = i + 1;
      await utils.sleep(config.pageInterval);
    } else {
      skipCount++;
    }
    if (skipCount > config.skipNum) {
      break;
    }
  }
  return newStart;
};



export const crawler1 = async(start1: number, baseFile: string): Promise<number> => {
  if (!config.crawlerS1) {
    return start1;
  }
  const newStart = await startCrawler(start1, baseFile);

  return newStart;
};
