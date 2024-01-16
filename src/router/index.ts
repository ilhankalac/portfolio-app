// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/GuestLayout.vue'),
    name: 'GuestLayout',
    // children: [
    //   {
    //     path: '',
    //     name: 'Home',
    //     // route level code-splitting
    //     // this generates a separate chunk (Home-[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import('@/views/Home.vue'),
    //   },
    // ],
  },
  {
    path: '/interests',
    component: () => import('@/views/InterestsPage.vue'),
    name: 'Interests',
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
