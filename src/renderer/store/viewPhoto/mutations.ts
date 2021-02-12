import { MutationTree } from 'vuex';
import { SET_MENUS, SET_FILES, SET_IMGS } from './mutationTypes';
import { ViewPhotoState, Menu, Img } from '../../interface';
import { File } from '@/main/interface';


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
};

export default mutations;
