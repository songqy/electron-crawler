import { crawlerMain } from '@/main/service/crawler';
import { getDirsByParent } from '@/main/service/viewPhoto';

const actions = [
  {
    key: 'crawlerMain',
    action: crawlerMain,
  },
  {
    key: 'dirsByParent',
    action: getDirsByParent,
  },
];

export default actions;
