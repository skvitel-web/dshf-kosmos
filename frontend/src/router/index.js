import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // 1. ГЛАВНАЯ СТРАНИЦА (Лендинг)
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },

  // 2. БЛОК ТРЕНЕРА (Плоская структура для простоты)
  // Мы не используем children здесь, чтобы избежать путаницы с <router-view> внутри дашборда
  {
    path: '/trainer',
    name: 'TrainerDashboard',
    component: () => import('@/views/trainer/TrainerDashboard.vue')
  },
  {
    path: '/trainer/groups',
    name: 'TrainerGroups',
    // Если у вас нет отдельного списка групп, временно ведем на общую вьюху
    component: () => import('@/views/trainer/TrainerGroupView.vue')
  },
  {
    path: '/trainer/group/:id',
    name: 'TrainerGroup',
    component: () => import('@/views/trainer/TrainerGroupView.vue')
  },
  {
    path: '/trainer/schedule',
    name: 'Schedule',
    component: () => import('@/views/trainer/ScheduleView.vue')
  },
  {
    path: '/trainer/referee',
    name: 'Referee',
    component: () => import('@/views/trainer/RefereeView.vue')
  },

  // 3. ОСТАЛЬНЫЕ РОЛИ
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/AdminView.vue')
  },
  {
    path: '/parent',
    name: 'Parent',
    component: () => import('@/views/parent/ParentView.vue')
  },
  {
    path: '/child',
    name: 'Child',
    component: () => import('@/views/child/ChildView.vue')
  },

  // 4. АВТОРИЗАЦИЯ
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/RegisterView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router