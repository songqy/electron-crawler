import config from '../config';
import axios, { AxiosRequestConfig } from 'axios';
import https from 'https';
import utils from '../common/utils';
import logger from '../common/logger';

export default {
  async httpGetHtml(url: string, _config?: AxiosRequestConfig, cnt = 1): Promise<any> {
    let res;
    const startTime = (new Date()).getTime();
    try {
      res = await this.httpGetSingle(url, {
        timeout: config.pageTimeout,
        responseType: 'arraybuffer',
        ..._config,
      });
    } catch (e) {
      const endTime = (new Date()).getTime();
      logger.error(`请求失败${cnt}次,time:${endTime - startTime}ms,url:${url},err:`, e);
      await utils.sleep(1000);

      if (cnt < 5) {
        res = await this.httpGetHtml(url, _config, cnt + 1);
      } else {
        res = null;
      }
    }
    return res;
  },

  async httpGetSingle(url: string, config?: AxiosRequestConfig): Promise<any> {
    const res = await axios.get(url, config);
    return res.data;
  },

  async httpGetImg(url: string, originUrl?: string, _config?: AxiosRequestConfig, cnt = 1): Promise<any>  {
    let res;
    const startTime = (new Date()).getTime();
    try {
      res = await this.httpGetSingle(url, {
        timeout: config.imageTimeout,
        headers: { 'Referer': originUrl },
        responseType: 'arraybuffer',
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        ..._config,
      });
    } catch (e) {
      const endTime = (new Date()).getTime();
      logger.error(`请求失败${cnt}次,time:${endTime - startTime}ms,url:${url},err:`, e);
      await utils.sleep(1000);

      // 请求失败后会再发送请求,最多请求8次
      if (cnt < 8) {
        res = await this.httpGetImg(url, originUrl, _config, cnt + 1);
      } else {
        res = null;
      }
    }
    return res;
  },
};
