
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
    action: (data: MessageOptions) => {
      const { message } = data;
      console.log(message);
      pushMessages(message, 'log');
    },
  },
  {
    key: 'errorMessage',
    action: (data: MessageOptions) => {
      const { message } = data;
      console.log(message);
      pushMessages(message, 'error');
    },
  },
];

type promiseFun = (data: any) => Promise<void>;
type fun = (data: any) => void;

const actionMap = new Map<string, promiseFun | fun>();
for (const item of actions) {
  actionMap.set(item.key, item.action);
}

export default actionMap;
