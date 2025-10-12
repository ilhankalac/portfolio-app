import { firebaseAuth, _onAuthStateChanged } from '@/config/firebase.config'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/core/layouts/DefaultLayout.vue'),
    name: 'DefaultLayout',
    hash: '#initial'
  },
  {
    path: '/create-realtime-data',
    component: () => import('@/core/components/common/CreateRealtimeData.vue'),
    name: 'CreateRealtimeData',
  },
  {
    path: '/login',
    component: () => import('@/features/auth/views/LoginView.vue'),
    name: 'Login',
  },
  {
    path: '/write-recommendation',
    component: () => import('@/features/recommendations/views/RecommendationFormView.vue'),
    name: 'WriteRecommendation',
  },
  {
    path: '/admin-panel',
    component: () => import('@/core/layouts/AdminLayout.vue'),
    name: 'AdminPanel',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'configure-about',
        component: () => import('@/features/portfolio/admin/views/AboutEditor.vue'),
      },
      {
        path: 'configure-experience',
        component: () => import('@/features/portfolio/admin/views/ExperienceEditor.vue'),
      },
      {
        path: 'configure-recommendations',
        component: () => import('@/features/portfolio/admin/views/RecommendationsEditor.vue'),
      },
      {
        path: 'configure-skills',
        component: () => import('@/features/portfolio/admin/views/SkillsEditor.vue'),
      },
      {
        path: 'configure-free-time-projects',
        component: () => import('@/features/portfolio/admin/views/ProjectsEditor.vue'),
      },
      {
        path: 'configure-get-in-touch',
        component: () => import('@/features/portfolio/admin/views/ContactEditor.vue'),
      },
      {
        path: 'write-blog',
        component: () => import('@/features/blog/admin/views/BlogEditor.vue'),
      },
      {
        path: 'write-quote',
        component: () => import('@/features/quotes/admin/views/QuoteEditor.vue'),
      },
      {
        path: 'configure-films',
        component: () => import('@/features/films/admin/views/FilmsEditor.vue'),
      }
    ]
  },
  {
    path: '/blogs',
    component: () => import('@/core/layouts/BlogLayout.vue'),
    children: [
      {
        path: 'list',
        component: () => import('@/features/blog/views/BlogListView.vue'),
      },
      {
        path: '/favorite-quotes/:id?',
        name: 'Quotes',
        component: () => import('@/features/quotes/views/QuotesView.vue'),
      },
      {
        path: ':id',
        name: 'BlogPage',
        component: () => import('@/features/blog/views/BlogDetailView.vue'),
      },
      {
        path: '/list-of-seen-films',
        name: 'ListOfSeenFilms',
        component: () => import('@/features/films/views/FilmsView.vue')
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
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
