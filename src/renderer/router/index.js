import Vue from 'vue';
import Router from 'vue-router';
import Crawler from '@p/Crawler';
import PhotoView from '@p/PhotoView';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Crawler',
      component: Crawler,
    },
    {
      path: '/view',
      name: 'PhotoView',
      component: PhotoView,
    },
  ],
});
