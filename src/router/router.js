import Vue from 'vue';
import Router from 'vue-router';

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
      component: () => import('../views/Home.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/department',
      name: 'department',
      component: () => import('../views/Department.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/dashboard',
      name: 'main-dashboard',
      component: () => import('../views/Admin/AdminDashboard.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/unit/:unit_id',
      name: 'unitBudget-details',
      component: () => import('../views/unitBudget.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/errors',
      name: 'errors',
      component: () => import('../views/Errors.vue'),
    },
    {
      path: '/budget',
      name: 'budget',
      component: () => import('../views/budgets.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin-dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/Admin/Dashboard.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/Admin/usersPage.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/create-user',
      name: 'create-user',
      component: () => import('../views/Admin/createUsers.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/update-user/:userId',
      name: 'update-user',
      component: () => import('../views/Admin/userUpdate.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/departments',
      name: 'departments',
      component: () => import('../views/Admin/Departments.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/unit',
      name: 'unit',
      component: () => import('../views/Admin/Unit.vue'),
    },
    {
      path: '/budget-periods',
      name: 'budget-periods',
      component: () => import('../views/BudgetPeriod.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/period/:period_id',
      name: 'period-details',
      component: () => import('../views/Details.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/new-budget',
      name: 'AddNewBudget',
      component: () => import('../views/AddNewBudget.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/budget-settings',
      name: 'budget-settings',
      component: () => import('../views/Admin/BudgetSettings.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/department-detail/:depart_id',
      name: 'department-detail',
      component: () => import('../views/Admin/DepartmentDetail.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/unit-detail/unit_id',
      name: 'unit-detail',
      component: () => import('../views/Admin/unitDetailPage.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '*',
      redirect: '/errors',
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    if (localStorage.getItem('auth')) {
      next('/home');
    }
  }


  if (to.meta.requiresAuth) {
    if (!localStorage.getItem('auth')) {
      next('/login');
    }
  }

  next();
});
export default router;
