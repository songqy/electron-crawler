import { ipcMain, WebContents } from 'electron';
import ipcActions from './ipcActions';

class Ipc {
  private contents: WebContents | undefined;

  // 初始化ipc事件
  public init(_contents: WebContents): void {
    ipcMain.on('message', (event, type: string, data?: any) => {
      const action = ipcActions.get(type);
      if (action) {
        console.log('action:', type);
        action(data);
      }
    });

    this.contents = _contents;
  }

  // main进程发送信息到renderer进程
  public sendMessage(type: string, data?: any): void {
    this.contents?.send('message', type, data);
  }
}

export default new Ipc();
