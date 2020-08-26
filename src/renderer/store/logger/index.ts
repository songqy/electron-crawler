import { Module } from 'vuex';
import state from './state';
import actions from './actions';
import mutations from './mutations';
import { LoggerState, RootState } from '../../interface';


const namespaced = true;

const logger: Module<LoggerState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
};

export default logger;
