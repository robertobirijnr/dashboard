import Vue from 'vue';
import Router from 'vue-router';


import Errors from '../views/Errors.vue';
import Admin from '../views/Admin/Dashboard.vue';
import Users from '../views/Admin/usersPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      redirect: '/admin-dashboard',
    },
    {
      path: '/admin-dashboard',
      name: 'admin-dashboard',
      component: Admin,
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
    },

    {
      path: '/errors',
      name: 'errors',
      component: Errors,
    },

    {
      path: '*',
      redirect: '/errors',
    },
  ],
});
