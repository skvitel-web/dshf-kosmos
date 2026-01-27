import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/HomeView.vue') },

  { path: '/login', component: () => import('@/views/auth/LoginView.vue') },
  { path: '/register', component: () => import('@/views/auth/RegisterView.vue') },

  { path: '/trainer', name: 'TrainerDashboard', component: () => import('@/views/trainer/TrainerDashboard.vue')},
  { path: '/trainer/group/:id', name: 'TrainerGroup', component: () => import('@/views/trainer/TrainerGroupView.vue')},
  { path: '/trainer/referee', name: 'Referee', component: () => import('@/views/trainer/RefereeView.vue')},
  { path: '/trainer/groups', component: () => import('@/views/trainer/TrainerGroupView.vue') },

  { path: '/admin', name: 'Admin', component: () => import('@/views/admin/AdminView.vue') },

  { path: '/parent', name: 'Parent', component: () => import('@/views/parent/ParentView.vue') },
  
  { path: '/child', name: 'Child', component: () => import('@/views/child/ChildView.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router