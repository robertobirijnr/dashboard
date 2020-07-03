import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from './views/Dashboard.vue';
import AddNewPost from './views/AddNewPost.vue';
import Errors from './views/Errors.vue';
import Budget from './views/budgets.vue';
import Tables from './views/Tables.vue';
import Department from './views/Department.vue';
import Home from './views/Home.vue';
import Login from './views/Login.vue';


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
      redirect: '/dashboard',
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/department',
      name: 'department',
      component: Department,
    },
    {
      path: '/add-new-post',
      name: 'add-new-post',
      component: AddNewPost,
    },
    {
      path: '/errors',
      name: 'errors',
      component: Errors,
    },
    {
      path: '/budget',
      name: 'budget',
      component: Budget,
    },
    {
      path: '/tables',
      name: 'tables',
      component: Tables,
    },
    {
      path: '*',
      redirect: '/errors',
    },
  ],
});
