import { crawlerMain } from '@/main/service/crawler';
import { getDirsByParent, setInfo } from '@/main/service/viewPhoto';

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
];

export default actions;
