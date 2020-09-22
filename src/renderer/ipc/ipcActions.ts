
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

const actions = [
  {
    key: 'logMessage',
    action: (data: MessageOptions): void => {
      const { message } = data;
      console.log(message);
      pushMessages(message, 'log');
    },
  },
  {
    key: 'errorMessage',
    action: (data: MessageOptions): void => {
      const { message } = data;
      console.log(message);
      pushMessages(message, 'error');
    },
  },
];

export default actions;
