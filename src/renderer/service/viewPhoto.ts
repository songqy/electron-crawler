import ipc from '../ipc';
import { FilesAndParent, Info } from '@/main/interface';
import store from '@/renderer/store';

export const getDirsByParent = (parent = '/'): void => {
  ipc.sendMessage('dirsByParent', { parent });
};


export const formatDirs = (data: FilesAndParent): void => {
  store.dispatch('viewPhoto/refreshMenus', data);
};


export const setInfo = (info: Info, parent: string): void => {
  ipc.sendMessage('setInfo', { parent, info });
};
