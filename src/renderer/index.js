// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'dotenv/config';
import Vue from 'vue';
import {
  Button,
  InputNumber,
  Menu,
  MenuItem,
  Submenu,
  Backtop,
  Icon,
  Rate,
  RadioButton,
  RadioGroup,
} from 'element-ui';
import App from './App';
import router from './router';
import ipc from './ipc';
import store from './store';

import TopMenu from '@c/TopMenu';

ipc.init();

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(InputNumber);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Backtop);
Vue.use(Icon);
Vue.use(Rate);
Vue.use(RadioButton);
Vue.use(RadioGroup);

Vue.component(TopMenu.name, TopMenu);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  // template: '<App/>',
  render: h => h(App),
});
