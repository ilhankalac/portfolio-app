// Composables
import { firebaseAuth, _onAuthStateChanged } from '@/firebase'
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
    path: '/login',
    component: () => import('@/views/Login.vue'),
    name: 'Login',
  },
  {
    path: '/admin-panel',
    component: () => import('@/views/AdminPanel.vue'),
    name: 'AdminPanel',
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      const element = document.getElementById(to.hash.slice(1));
      if (element) {
        return { el: element, behavior: 'smooth', top: 60, left: 0 }
      }
    } 
  },
})

const getCurrentUser = () => { 
  return new Promise((resolve, reject) => {
    const removeListener = _onAuthStateChanged(firebaseAuth, user => {
      removeListener();
      resolve(user);
     }, reject);
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!await getCurrentUser()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
