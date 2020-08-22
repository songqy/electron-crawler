import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@c/HelloWorld';
import Crawler from '@c/Crawler';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/crawler',
      name: 'Crawler',
      component: Crawler,
    },
  ],
});
