
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

const actions = [
  {
    key: 'logMessage',
    action: (args: any[]) => {
      console.log(...args);
      pushMessages(args.join(' '), 'log');
    },
  },
  {
    key: 'errorMessage',
    action: (args: any[]) => {
      console.error(...args);
      pushMessages(args.join(' '), 'error');
    },
  },
];

type promiseFun = () => Promise<void>;
type fun = (args: any[]) => void;

const actionMap = new Map<string, promiseFun | fun>();
for (const item of actions) {
  actionMap.set(item.key, item.action);
}

export default actionMap;
