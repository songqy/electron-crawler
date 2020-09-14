import { crawlerMain } from '@/main/service/crawler';

const actions = [
  {
    key: 'crawlerMain',
    action: crawlerMain,
  },
];

type promiseFun = (data: any) => Promise<void>

const actionMap = new Map<string, promiseFun>();
for (const item of actions) {
  actionMap.set(item.key, item.action);
}

export default actionMap;
