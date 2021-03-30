import config from '@/main/config';
import https from 'https';
import utils from '@/main/common/utils';
import logger from '@/main/common/logger';
import got, { OptionsOfBufferResponseBody } from 'got';

async function httpGetBuffer(url: string, options: OptionsOfBufferResponseBody): Promise<Buffer> {
  const res = await got.get(url, options);
  return res.body;
}

export default {
  async httpGetHtml(url: string, cnt = 1): Promise<Buffer | undefined> {
    let res: Buffer | undefined;
    const startTime = Date.now();
    try {
      res = await httpGetBuffer(url, {
        timeout: config.pageTimeout,
        responseType: 'buffer',
      });
    } catch (e) {
      const endTime = Date.now();
      logger.error(`请求失败${cnt}次,time:${endTime - startTime}ms,url:${url},err:`, e);
      await utils.sleep(1000);

      if (cnt < 5) {
        res = await this.httpGetHtml(url, cnt + 1);
      }
    }
    return res;
  },

  async httpGetImg(url: string, originUrl?: string, cnt = 1): Promise<Buffer | undefined>  {
    let res: Buffer | undefined;
    const startTime = Date.now();
    try {
      res = await httpGetBuffer(url, {
        timeout: config.imageTimeout,
        headers: { 'Referer': originUrl },
        responseType: 'buffer',
        agent: {
          https: new https.Agent({ rejectUnauthorized: false }),
        },
      });
    } catch (e) {
      const endTime = Date.now();
      logger.error(`请求失败${cnt}次,time:${endTime - startTime}ms,url:${url},err:`, e);
      await utils.sleep(1000);

      // 请求失败后会再发送请求,最多请求8次
      if (cnt < 8) {
        res = await this.httpGetImg(url, originUrl, cnt + 1);
      }
    }
    return res;
  },
};
