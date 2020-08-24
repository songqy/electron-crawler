
import httpRequest from '@/modal/httpRequest';
import { writeFile } from '@/modal/file';


const saveSinglePic = async(i: number, imgUrl: string, file: string, originUrl?: string): Promise<void> => {
  const img: ArrayBuffer = await httpRequest.httpGetImg(imgUrl, originUrl);
  if (img) {
    const imgFile = `${file}/img${(i + 1)}.jpg`;
    writeFile(imgFile, Buffer.from(img));
  }
};

export const savePicList = async(imgSrcList: string[], file: string, originUrl?: string): Promise<void> => {
  let p = [];
  const len = imgSrcList.length;

  const htmlFile = file + '/img_src_list.json';
  writeFile(htmlFile, JSON.stringify(imgSrcList));

  //分开多组请求
  for (let i = 0; i < len; ++i) {
    const imgUrl = imgSrcList[i];
    p.push(saveSinglePic(i, imgUrl, file, originUrl));
    if (i % 30 === 0 && i !== 0) {
      await Promise.all(p);
      p = [];
    }
  }
  if (p.length > 0) {
    await Promise.all(p);
  }
};
