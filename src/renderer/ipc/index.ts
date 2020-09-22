import { ipcRenderer } from 'electron';
import ipcActions from './ipcActions';
import utils from '@/main/common/utils';

const ipcActionsMap = utils.createActionsMap(ipcActions);

class Ipc {
  // 初始化监听事件
  public init(): void{
    ipcRenderer.on('message', (event, type: string, data?: any) => {
      const action = ipcActionsMap.get(type);
      if (action) {
        action(data);
      }
    });
  }

  public sendMessage(type: string, data?: any): void {
    ipcRenderer.send('message', type, data);
  }
}

export default new Ipc();
