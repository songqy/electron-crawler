import Vue from 'vue';
import Router from 'vue-router';
import Crawler from '@p/Crawler';
import PhotoView from '@p/PhotoView';
import Statistics from '@p/Statistics';

Vue.use(Router);

export const routes = [
  {
    title: '爬虫',
    path: '/crawler',
    name: 'Crawler',
    component: Crawler,
  },
  {
    title: '统计',
    path: '/statistics',
    name: 'Statistics',
    component: Statistics,
  },
  {
    title: '展示',
    path: '/view',
    name: 'PhotoView',
    component: PhotoView,
  },
];

export default new Router({
  routes,
});
