import { MutationTree } from 'vuex';
import { SET_RANK_COUNT } from './mutationTypes';
import { StatisticsState } from '../../interface';


const mutations: MutationTree<StatisticsState> = {
  [SET_RANK_COUNT] (state, payload: number[]) {
    state.rankCount = payload;
    state.totalCount = payload.reduce((acc, cur) => acc + cur, 0);
  },
};

export default mutations;
