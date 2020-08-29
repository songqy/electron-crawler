import { ipcRenderer } from 'electron';
import store from '../store';
import { LoggerMessagesOption } from '../interface';

let count = 0;

export default {
  // 注册监听事件
  register(): void{
    ipcRenderer.on('logMessage', (event, ...args) => {
      console.log(...args);
      const loggerMessage: LoggerMessagesOption = {
        type: 'log',
        message: args.join(' '),
        index: ++count,
      };
      const loggerDiv = document.getElementById('logger');
      if (loggerDiv) {
        loggerDiv.scrollTop = loggerDiv.scrollHeight;
      }
      store.dispatch('logger/pushMessages', [loggerMessage]);
    });

    ipcRenderer.on('errorMessage', (event, ...args) => {
      console.error(...args);
    });
  },

  crawlerMain(): void {
    ipcRenderer.send('crawlerMain');
  },
};
