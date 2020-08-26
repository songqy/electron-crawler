import Vue from 'vue';
import Router from 'vue-router';
import Crawler from '@c/Crawler';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Crawler',
      component: Crawler,
    },
  ],
});
