import { logMessage, errorMessage } from '../service/logger';
import { formatDirs } from '../service/viewPhoto';

const actions = [
  {
    key: 'logMessage',
    action: logMessage,
  },
  {
    key: 'errorMessage',
    action: errorMessage,
  },
  {
    key: 'dirsByParent',
    action: formatDirs,
  },
];

export default actions;
