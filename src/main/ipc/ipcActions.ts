import { crawlerMain } from '@/main/service/crawler';
import { getDirsByParent, setInfo } from '@/main/service/viewPhoto';
import { startStatistics, getRankCount } from '@/main/service/statistics';

const actions = [
  {
    key: 'crawlerMain',
    action: crawlerMain,
  },
  {
    key: 'dirsByParent',
    action: getDirsByParent,
  },
  {
    key: 'setInfo',
    action: setInfo,
  },
  {
    key: 'startStatistics',
    action: startStatistics,
  },
  {
    key: 'getRankCount',
    action: getRankCount,
  },
];

export default actions;
