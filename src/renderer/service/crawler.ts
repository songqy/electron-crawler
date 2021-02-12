import ipc from '../ipc';
import { CrawlerOptions } from '../../main/interface';

export const crawlerMain = (data?: CrawlerOptions): void => {
  ipc.sendMessage('crawlerMain', data);
};
