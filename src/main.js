// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import localforage from 'localforage';
require('localforage-startswith');
import 'bulma/css/bulma.css';

import { App } from './app';
import router from './router';
import store from './store';

localforage.config({
  name: 'budgeterbium'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
