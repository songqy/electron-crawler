import ipc from '../ipc';
import store from '@/renderer/store';

export const startStatistics = (): void => {
  ipc.sendMessage('startStatistics');
};

export const getRankCount = (): void => {
  ipc.sendMessage('getRankCount');
};

export const setRankCount = (rankCount: number[]): void => {
  store.dispatch('statistics/setRankCount', rankCount);
};
