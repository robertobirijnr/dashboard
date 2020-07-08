/* eslint-disable */
import Vue from 'vue';
import ShardsVue from 'shards-vue';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import '@/scss/shards-dashboards.scss';
import '@/assets/scss/date-range.scss';

// Core
import App from './App.vue';
import router from './router/router';
import axios from 'axios';

// Layouts
import Default from '@/layouts/Default.vue';

ShardsVue.install(Vue);
window.axios = axios;

Vue.component('default-layout', Default);

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();

const authData = localStorage.getItem("auth");

new Vue({
  router,
  data: {
    auth: authData ? JSON.parse(authData) : {}
  },
  render: h => h(App),
}).$mount('#app');
