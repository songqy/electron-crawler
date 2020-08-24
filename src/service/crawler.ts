import { crawler1 } from '@/service/crawler1';
import { crawler2 } from '@/service/crawler2';
import { setStartEnd, getStartEnd } from '@/service/startEnd';
import moment from 'moment';
import config from '@/config';
import { mkdir } from '@/modal/file';



const getBaseFile = async(): Promise<string> => {
  const dateStr: string = moment().format('YYYY-MM-DD');
  const baseFile = `${config.fileDir}/${dateStr}/`;
  await mkdir(baseFile);
  return baseFile;
};

const crawlerAll = async(baseFile: string): Promise<void> => {
  let { start1, end2 } = await getStartEnd();

  console.log('start1:', start1);
  console.log('end2:', end2);

  const [start1_, end2_] = await Promise.all([
    crawler1(start1, baseFile),
    crawler2(end2, baseFile),
  ]);

  start1 = Math.max(start1_, start1);
  end2 = Math.max(end2_, end2);

  setStartEnd(start1, end2);
};

export const crawlerMain = async(baseUrl1: string): Promise<void> => {
//   const { s1, s2, zip } = options;
  const baseFile = await getBaseFile();

  // 只爬一个
  //   if (s1) {
  //     console.log(s1 + ' is search');
  //     await this.crawlerService1.singleCrawler(s1, baseFile);
  //     console.log(s1 + ' is done');
  //   } else if (s2) {
  //     console.log(s2 + ' is search');
  //     await this.crawlerService2.singleCrawler(s2, baseFile);
  //     console.log(s2 + ' is done');
  //   } else {
  //     await this.crawlerAll(baseFile, zip);
  //   }

  await crawlerAll(baseFile);
};

