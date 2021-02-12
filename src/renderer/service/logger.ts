import store from '@/renderer/store';
import { LoggerMessagesOptions, MessageType, MessageOptions } from '@/renderer/interface';



let count = 0;

const pushMessages = (message: string, type: MessageType) => {
  const loggerMessage: LoggerMessagesOptions = {
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


export const logMessage = (data: MessageOptions): void => {
  const { message } = data;
  console.log(message);
  pushMessages(message, 'log');
};


export const errorMessage = (data: MessageOptions): void => {
  const { message } = data;
  console.log(message);
  pushMessages(message, 'error');
};

