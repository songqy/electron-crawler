import { ipcMain, WebContents, IpcMainEvent } from 'electron';
import ipcActions from './ipcActions';
import utils from '@/main/common/utils';

const ipcActionsMap = utils.createActionsMap(ipcActions);

const actionHandle = async (event: IpcMainEvent, type: string, data?: any): Promise<void> => {
  const action = ipcActionsMap.get(type);
  if (action) {
    const res = await action(data);
    event.reply(type, res);
  }
};

class Ipc {
  private contents: WebContents | undefined;

  // 初始化ipc事件
  public init(_contents: WebContents): void {
    for (const [type] of ipcActionsMap) {
      ipcMain.on(type, (event, data?: any) => {
        actionHandle(event, type, data);
      });
    }

    this.contents = _contents;
  }

  // main进程发送信息到renderer进程
  public sendMessage(type: string, data?: any): void {
    this.contents?.send(type, data);
  }
}

export default new Ipc();
