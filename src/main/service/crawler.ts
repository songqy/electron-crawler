import { crawler1 } from '@/main/service/crawler1';
import { crawler2 } from '@/main/service/crawler2';
import { setStartEnd, getStartEnd } from './startEnd';
import dayjs from 'dayjs';
import config from '@/main/config';
import { mkdir } from '@/main/modal/file';
import logger from '@/main/common/logger';
import { CrawlerOptions } from '@/main/interface';
import { singleCrawler1 } from '@/main/service/crawler1';
import { singleCrawler2 } from '@/main/service/crawler2';


const getBaseFile = async(): Promise<string> => {
  const dateStr = dayjs().format('YYYY-MM-DD');
  const baseFile = `${config.fileDir}/${dateStr}/`;
  await mkdir(baseFile);
  return baseFile;
};

const crawlerAll = async(baseFile: string): Promise<void> => {
  let { start1, end2 } = await getStartEnd();

  logger.log(`start1:${start1}`);
  logger.log(`end2:${end2}`);

  const [start1_, end2_] = await Promise.all([
    crawler1(start1, baseFile),
    crawler2(end2, baseFile),
  ]);

  start1 = Math.max(start1_, start1);
  end2 = Math.max(end2_, end2);

  setStartEnd(start1, end2);
};

export const crawlerMain = async(options?: CrawlerOptions): Promise<void> => {
  const s1 = options?.s1;
  const s2 = options?.s2;
  const baseFile = await getBaseFile();

  // 只爬一个
  if (s1) {
    logger.log(s1 + ' is search');
    await singleCrawler1(s1, baseFile);
    logger.log(s1 + ' is done');
  } else if (s2) {
    logger.log(s2 + ' is search');
    await singleCrawler2(s2, baseFile);
    logger.log(s2 + ' is done');
  } else {
    await crawlerAll(baseFile);
  }
};

