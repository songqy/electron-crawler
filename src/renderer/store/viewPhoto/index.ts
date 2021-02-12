import { Module } from 'vuex';
import state from './state';
import actions from './actions';
import mutations from './mutations';
import { ViewPhotoState, RootState } from '../../interface';


const namespaced = true;

const logger: Module<ViewPhotoState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
};

export default logger;
