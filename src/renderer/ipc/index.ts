import { ipcRenderer } from 'electron';
import ipcActions from './ipcActions';
import utils from '@/main/common/utils';


const ipcActionsMap = utils.createActionsMap(ipcActions);

class Ipc {
  // 初始化监听事件
  public init(): void {
    for (const [type] of ipcActionsMap) {
      ipcRenderer.on(type, (event, data?: any) => {
        const action = ipcActionsMap.get(type);
        if (action) {
          action(data);
        }
      });
    }
  }

  public sendMessage(type: string, data?: any): void {
    ipcRenderer.send(type, data);
  }
}

export default new Ipc();
