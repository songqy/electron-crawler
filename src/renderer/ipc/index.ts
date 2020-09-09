import { ipcRenderer } from 'electron';
import ipcActions from './ipcActions';

export default {
  // 初始化监听事件
  init(): void{
    ipcRenderer.on('message', (event, type, ...args) => {
      const action = ipcActions.get(type);
      if (action) {
        action(args);
      }
    });
  },

  sendMessage(type: string): void {
    ipcRenderer.send('message', type);
  },
};
