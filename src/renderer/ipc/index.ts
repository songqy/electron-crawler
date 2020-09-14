import { ipcRenderer } from 'electron';
import ipcActions from './ipcActions';

export default {
  // 初始化监听事件
  init(): void{
    ipcRenderer.on('message', (event, type: string, data?: any) => {
      const action = ipcActions.get(type);
      if (action) {
        action(data);
      }
    });
  },

  sendMessage(type: string, data?: any): void {
    ipcRenderer.send('message', type, data);
  },
};
