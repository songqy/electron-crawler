import ipc from '@/main/ipc';

type loggerOptions = string | number;

export default {
  log(...args: loggerOptions[]): void {
    console.log(...args);
    ipc.sendMessage('logMessage', args.join(' '));
  },

  error(...args: loggerOptions[]): void {
    console.error(...args);
    ipc.sendMessage('errorMessage', args.join(' '));
  },
};
