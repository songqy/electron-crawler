import { PUSH_MESSAGES, CLEAR_MESSAGES } from './mutationTypes';
import { ActionTree } from 'vuex';
import { RootState, LoggerState, LoggerMessagesOptions } from '../../interface';


const actions: ActionTree<LoggerState, RootState> = {
  pushMessages({ commit }, messages: LoggerMessagesOptions[]): void {
    commit(PUSH_MESSAGES, messages);
  },

  clearMessages({ commit }): void {
    commit(CLEAR_MESSAGES);
  },
};

export default actions;
