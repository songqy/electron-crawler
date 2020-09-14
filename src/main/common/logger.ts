import ipc from '@/main/ipc';

type loggerOptions = string | number;

export default {
  log(...args: loggerOptions[]): void {
    console.log(...args);
    ipc.sendMessage('logMessage', { message: args.join(' ') });
  },

  error(...args: loggerOptions[]): void {
    console.error(...args);
    ipc.sendMessage('errorMessage', { message: args.join(' ') });
  },
};
