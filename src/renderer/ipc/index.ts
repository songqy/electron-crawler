import { ipcRenderer } from 'electron';


export default {
  // 注册监听事件
  register(): void{
    ipcRenderer.on('logMessage', (event, ...args) => {
      console.log(...args);
    });

    ipcRenderer.on('errorMessage', (event, ...args) => {
      console.error(...args);
    });
  },

  crawlerMain(): void {
    ipcRenderer.send('crawlerMain');
  },
};
