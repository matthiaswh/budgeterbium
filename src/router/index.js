import Vue from 'vue';
import Router from 'vue-router';
import { routes } from '../app';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: routes
});
