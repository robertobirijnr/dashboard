import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '../views/Dashboard.vue';
import Errors from '../views/Errors.vue';
import Budget from '../views/budgets.vue';
import BudgetPeriod from '../views/BudgetPeriod.vue';
import Department from '../views/Department.vue';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import AddNewBudget from '../views/AddNewBudget.vue';
import Details from '../views/Details.vue';
import UnitBudgetDetails from '../views/unitBudget.vue';
import Admin from '../views/Admin/Dashboard.vue';
import Users from '../views/Admin/usersPage.vue';
import CreateUser from '../views/Admin/createUsers.vue';
import Departments from '../views/Admin/Departments.vue';
import Unit from '../views/Admin/Unit.vue';
import BudgetSettings from '../views/Admin/BudgetSettings.vue';


Vue.use(Router);
const router = new Router({
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
      redirect: '/login',
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/budget',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/department',
      name: 'department',
      component: Department,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/unit/:unit_id',
      name: 'unitBudget-details',
      component: UnitBudgetDetails,
      meta: {
        requiresAuth: true,
      },
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
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin-dashboard',
      name: 'admin-dashboard',
      component: Admin,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
    },
    {
      path: '/create-user',
      name: 'create-user',
      component: CreateUser,
    },
    {
      path: '/departments',
      name: 'departments',
      component: Departments,
    },
    {
      path: '/unit',
      name: 'unit',
      component: Unit,
    },
    {
      path: '/budget-periods',
      name: 'budget-periods',
      component: BudgetPeriod,
    },
    {
      path: '/period/:period_id',
      name: 'period-details',
      component: Details,
    },
    {
      path: '/new-budget',
      name: 'AddNewBudget',
      component: AddNewBudget,
    },
    {
      path: '/budget-settings',
      name: 'budget-settings',
      component: BudgetSettings,
    },
    {
      path: '*',
      redirect: '/errors',
    },
  ],
});
router.beforeEach((to, from, next) => {
  /* Both '/login' and '/login/' should share the same route name even if their path is different */
  if (to.name === 'login') {
    if (localStorage.getItem('auth')) {
      next('/home');
    }
  }

  // Redirect to login if the route requires auth and no token is set
  if (to.meta.requiresAuth) {
    if (!localStorage.getItem('auth')) {
      next('/login');
    }
  }

  next();
});
export default router;
