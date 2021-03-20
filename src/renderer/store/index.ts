import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '../interface';

import logger from './logger';
import viewPhoto from './viewPhoto';

Vue.use(Vuex);


const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0', // a simple property
    viewType: 'default',
  },
  modules: {
    logger,
    viewPhoto,
  },
};

export default new Vuex.Store<RootState>(store);
