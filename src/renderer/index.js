// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'dotenv/config';
import Vue from 'vue';
import {
  Button,
} from 'element-ui';
import App from './App';
import router from './router';
import ipc from './ipc';
import store from './store';

ipc.register();

Vue.config.productionTip = false;

Vue.use(Button);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  // template: '<App/>',
  render: h => h(App),
});
