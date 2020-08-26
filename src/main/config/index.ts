import path from 'path';

export default {
  baseUrl1: process.env.baseUrl1 || '',
  baseUrl2: process.env.baseUrl2 || '',

  pageInterval: 200,
  pageTimeout: 5000,
  imageTimeout: 5000,

  crawlerS1: !!process.env.crawlerS1,
  crawlerS2: !!process.env.crawlerS2,

  // 可以跳过的数量
  skipNum: 15,

  fileDir: path.join(__dirname, '../../../file_assest'),
};
