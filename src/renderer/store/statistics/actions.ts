import { SET_RANK_COUNT } from './mutationTypes';
import { ActionTree } from 'vuex';
import { RootState, StatisticsState } from '../../interface';


const actions: ActionTree<StatisticsState, RootState> = {
  setRankCount({ commit }, rankCount: number[]): void {
    commit(SET_RANK_COUNT, rankCount);
  },
};

export default actions;
