import { PUSH_MESSAGES } from './mutationTypes';
import { ActionTree } from 'vuex';
import { RootState, LoggerState, LoggerMessagesOption } from '../../interface';


const actions: ActionTree<LoggerState, RootState> = {
  pushMessages({ commit }, messages: LoggerMessagesOption[]): void {
    commit(PUSH_MESSAGES, messages);
  },
};

export default actions;
