import ipc from '../ipc';
import { FilesAndParent, Info, RANK } from '@/main/interface';
import store from '@/renderer/store';

export const getDirsByParent = (parent = '/', rank?: RANK): void => {
  ipc.sendMessage('dirsByParent', { parent, rank });
};


export const formatDirs = (data: FilesAndParent): void => {
  store.dispatch('viewPhoto/refreshMenus', data);
};


export const setInfo = (info: Info, parent: string): void => {
  ipc.sendMessage('setInfo', { parent, info });
};
