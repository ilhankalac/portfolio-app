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
    path: '/write-recommendation',
    component: () => import('@/views/WriteRecommendation.vue'),
    name: 'WriteRecommendation',
  },
  {
    path: '/admin-panel',
    component: () => import('@/layouts/AdminPanel.vue'),
    name: 'AdminPanel',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'configure-about',
        component: () => import('@/views/Admin/portfolio/ConfigureAbout.vue'),
      },
      {
        path: 'configure-experience',
        component: () => import('@/views/Admin/portfolio/ConfigureExperience.vue'),
      },
      {
        path: 'configure-recommendations',
        component: () => import('@/views/Admin/portfolio/ConfigureRecommendations.vue'),
      },
      {
        path: 'configure-skills',
        component: () => import('@/views/Admin/portfolio/ConfigureSkills.vue'),
      },
      {
        path: 'configure-free-time-projects',
        component: () => import('@/views/Admin/portfolio/ConfigureFreeTimeProjects.vue'),
      },
      {
        path: 'configure-get-in-touch',
        component: () => import('@/views/Admin/portfolio/ConfigureGetInTouch.vue'),
      },
      {
        path: 'write-blog',
        component: () => import('@/views/Admin/creative_tools/WriteBlog.vue'),
      },
      {
        path: 'write-quote',
        component: () => import('@/views/Admin/creative_tools/WriteQuote.vue'),
      }
    ]
  },
  {
    path: '/blogs',
    component: () => import('@/layouts/BlogLayout.vue'),
    children: [
      {
        path: 'list',
        component: () => import('@/views/blogs/BlogList.vue'),
      },
      {
        path: '/favorite-quotes/:id?',
        name: 'Quotes',
        component: () => import('@/views/Other/FavoriteQuotes.vue'),
      },
      {
        path: ':id',
        name: 'BlogPage',
        component: () => import('@/views/blogs/BlogPage.vue'),
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      const element = document.getElementById(to.hash.slice(1))
      if (element) {
        return { el: element, behavior: 'smooth', top: 60, left: 0 }
      }
    } 
  },
})

const getCurrentUser = () => { 
  return new Promise((resolve, reject) => {
    const removeListener = _onAuthStateChanged(firebaseAuth, user => {
      removeListener()
      resolve(user)
     }, reject)
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
