import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/trainer',
    name: 'TrainerDashboard',
    component: () => import('@/views/trainer/TrainerDashboard.vue'),
    meta: { requiresAuth: true, roles: ['TRAINER'] },
  },
  {
    path: '/trainer/groups',
    name: 'TrainerGroups',
    component: () => import('@/views/trainer/TrainerGroupView.vue'),
    meta: { requiresAuth: true, roles: ['TRAINER'] },
  },
  {
    path: '/trainer/group/:id',
    name: 'TrainerGroup',
    component: () => import('@/views/trainer/TrainerGroupView.vue'),
    meta: { requiresAuth: true, roles: ['TRAINER'] },
  },
  {
    path: '/trainer/schedule',
    name: 'Schedule',
    component: () => import('@/views/trainer/ScheduleView.vue'),
    meta: { requiresAuth: true, roles: ['TRAINER'] },
  },
  {
    path: '/trainer/referee',
    name: 'Referee',
    component: () => import('@/views/trainer/RefereeView.vue'),
    meta: { requiresAuth: true, roles: ['TRAINER'] },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/AdminView.vue'),
    meta: { requiresAuth: true, roles: ['ADMIN'] },
  },
  {
    path: '/parent',
    name: 'Parent',
    component: () => import('@/views/parent/ParentView.vue'),
    meta: { requiresAuth: true, roles: ['PARENT'] },
  },
  {
    path: '/child',
    name: 'Child',
    component: () => import('@/views/child/ChildView.vue'),
    meta: { requiresAuth: true, roles: ['PARENT'] },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: { guestOnly: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return authStore.dashboardRoute
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }

  if (to.meta.roles?.length && !to.meta.roles.includes(authStore.role)) {
    return authStore.isAuthenticated ? authStore.dashboardRoute : { name: 'Login' }
  }

  return true
})

export default router
