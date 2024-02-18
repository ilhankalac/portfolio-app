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
  {
    path: '/initial',
    component: () => import('@/views/Initial.vue'),
    name: 'Initial',
    hash: ''
  },
  {
    path: '/about',
    component: () => import('@/views/About.vue'),
    name: 'About',
    hash: '#about'
  },
  {
    path: '/experience',
    component: () => import('@/views/Experience.vue'),
    name: 'Experience',
    hash: '#experience'
  },
  {
    path: '/recommendations',
    component: () => import('@/views/Recommendations.vue'),
    name: 'Recommendations',
    hash: '#recommendations'
  },
  {
    path: '/skills',
    component: () => import('@/views/Skills.vue'),
    name: 'Skills',
    hash: '#skills'
  },
  {
    path: '/get-in-touch',
    component: () => import('@/views/GetInTouch.vue'),
    name: 'GetInTouch',
    hash: '#get-in-touch'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      const element = document.getElementById(to.hash);
      console.log(element);
      if (element) {
        return { el: element, behavior: 'smooth', top: 60 }
      }
    } 
  },
})

export default router
