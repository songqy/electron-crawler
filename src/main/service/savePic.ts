
import httpRequest from '@/main/modal/httpRequest';
import { writeFile, existsFile, readFile } from '@/main/modal/file';
import utils, { groupFun } from '@/main/common/utils';
import logger from '@/main/common/logger';


const saveSinglePic = async(i: number, imgUrl: string, file: string, originUrl?: string): Promise<void> => {
  const imgFile = `${file}/img${(i + 1)}.jpg`;
  // 已存在则不需重新请求
  if (await existsFile(imgFile)) {
    logger.log(`${imgFile}, The file is already exists`);
    return;
  }
  const img = await httpRequest.httpGetImg(imgUrl, originUrl);
  if (img) {
    writeFile(imgFile, img);
  }
};

export const getPicList = async(file: string): Promise<string[]> => {
  const htmlFile = file + '/img_src_list.json';
  if (await existsFile(htmlFile)) {
    logger.log(`${htmlFile}, The file is already exists`);
    const s = await readFile(htmlFile);
    return JSON.parse(s.toString());
  }
  return [];
};

export const savePicList = async(imgSrcList: string[], file: string, originUrl?: string): Promise<void> => {
  const p: groupFun<void>[] = [];
  const len = imgSrcList.length;

  const htmlFile = file + '/img_src_list.json';
  writeFile(htmlFile, JSON.stringify(imgSrcList));

  //分开多组请求
  // for (let i = 0; i < len; ++i) {
  //   const imgUrl = imgSrcList[i];
  //   p.push(saveSinglePic(i, imgUrl, file, originUrl));
  //   if (i % 30 === 0 && i !== 0) {
  //     await Promise.all(p);
  //     p = [];
  //   }
  // }
  // if (p.length > 0) {
  //   await Promise.all(p);
  // }

  // 分开多组请求
  for (let i = 0; i < len; ++i) {
    const imgUrl = imgSrcList[i];
    p.push({
      fun: saveSinglePic,
      args: [i, imgUrl, file, originUrl],
    });
    // p.push(saveSinglePic(i, imgUrl, file, originUrl));
  }
  await utils.promiseGroup(p, 30);
};
