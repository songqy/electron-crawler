import { Module } from 'vuex';
import state from './state';
import actions from './actions';
import mutations from './mutations';
import { StatisticsState, RootState } from '../../interface';


const namespaced = true;

const Statistics: Module<StatisticsState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
};

export default Statistics;
