import { MutationTree } from 'vuex';
import { PUSH_MESSAGES, CLEAR_MESSAGES } from './mutationTypes';
import { LoggerState, LoggerMessagesOptions } from '../../interface';


const mutations: MutationTree<LoggerState> = {
  [PUSH_MESSAGES] (state, payload: LoggerMessagesOptions[]) {
    state.loggerMessages.push(...payload);
  },
  [CLEAR_MESSAGES] (state) {
    state.loggerMessages = [];
  },
};

export default mutations;
