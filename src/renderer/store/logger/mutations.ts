import { MutationTree } from 'vuex';
import { PUSH_MESSAGES } from './mutationTypes';
import { LoggerState, LoggerMessagesOption } from '../../interface';


const mutations: MutationTree<LoggerState> = {
  [PUSH_MESSAGES] (state, payload: LoggerMessagesOption[]) {
    state.loggerMessages.push(...payload);
  },
};

export default mutations;
