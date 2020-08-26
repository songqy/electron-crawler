import { ipcMain, WebContents } from 'electron';
import { crawlerMain } from '../service/crawler';

let contents: WebContents;

export default {

  // 注册ipc事件
  register(): void {
    ipcMain.on('crawlerMain', (event, arg) => {
      console.log('crawlerMain', arg);
      crawlerMain();
      event.reply('crawlerMain', 'start');
    });
  },

  setContent(_contents: WebContents): void {
    contents = _contents;
  },

  // main进程发送信息到renderer进程
  sendMessage(type: string, message: string): void {
    contents.send(type, message);
  },
};
