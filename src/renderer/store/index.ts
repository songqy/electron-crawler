import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '../interface';

import logger from './logger';

Vue.use(Vuex);


const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0', // a simple property
  },
  modules: {
    logger,
  },
};

export default new Vuex.Store<RootState>(store);
