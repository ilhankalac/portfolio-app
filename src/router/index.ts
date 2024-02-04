// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/GuestLayout.vue'),
    name: 'GuestLayout',
  },
  {
    path: '/interests',
    component: () => import('@/views/Interests.vue'),
    name: 'Interests',
  },
  {
    path: '/create-realtime-data',
    component: () => import('@/components/CreateRealtimeData.vue'),
    name: 'CreateRealtimeData',
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
