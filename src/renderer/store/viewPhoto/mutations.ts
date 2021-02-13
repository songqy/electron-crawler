import { MutationTree } from 'vuex';
import { SET_MENUS, SET_FILES, SET_IMGS, SET_INFO, SET_PARENT } from './mutationTypes';
import { ViewPhotoState, Menu, Img } from '../../interface';
import { File, Info } from '@/main/interface';


const mutations: MutationTree<ViewPhotoState> = {
  [SET_MENUS] (state, payload: Menu[]) {
    state.menus = [...payload];
  },
  [SET_FILES] (state, payload: File[]) {
    state.files = [...payload];
  },
  [SET_IMGS] (state, payload: Img[]) {
    state.imgs = [...payload];
  },
  [SET_INFO] (state, payload: Info) {
    state.info = payload;
  },
  [SET_PARENT] (state, payload: string) {
    state.parent = payload;
  },
};

export default mutations;
