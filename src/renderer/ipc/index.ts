import { ipcRenderer } from 'electron';
import store from '@/renderer/store';
import { LoggerMessagesOption, MessageType } from '@/renderer/interface';

let count = 0;

const pushMessages = (message: string, type: MessageType) => {
  const loggerMessage: LoggerMessagesOption = {
    type,
    message,
    index: ++count,
  };
  const loggerDiv = document.getElementById('logger');
  if (loggerDiv) {
    loggerDiv.scrollTop = loggerDiv.scrollHeight;
  }
  store.dispatch('logger/pushMessages', [loggerMessage]);
};

export default {
  // 注册监听事件
  register(): void{
    ipcRenderer.on('logMessage', (event, ...args) => {
      console.log(...args);
      pushMessages(args.join(' '), 'log');
    });

    ipcRenderer.on('errorMessage', (event, ...args) => {
      console.error(...args);
      pushMessages(args.join(' '), 'error');
    });
  },

  crawlerMain(): void {
    ipcRenderer.send('crawlerMain');
  },
};
