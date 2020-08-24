import path from 'path';

export default {
  baseUrl1: process.env.baseUrl1 || '',

  pageInterval: 200,
  pageTimeout: 5000,
  imageTimeout: 5000,

  // 可以跳过的数量
  skipNum: 15,

  fileDir: path.join(__dirname, '../file_assest'),
};
