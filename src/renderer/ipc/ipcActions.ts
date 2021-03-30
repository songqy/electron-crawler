import { logMessage, errorMessage } from '../service/logger';
import { formatDirs } from '../service/viewPhoto';
import { setRankCount } from '../service/statistics';

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
  {
    key: 'getRankCount',
    action: setRankCount,
  },
];

export default actions;
