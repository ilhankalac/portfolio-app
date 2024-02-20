// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/GuestLayout.vue'),
    name: 'GuestLayout',
    hash: '#initial'
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
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      const element = document.getElementById(to.hash.slice(1));
      if (element) {
        return { el: element, behavior: 'smooth', top: 60 }
      }
    } 
  },
})

export default router
