import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: HomePage,
          meta: {
            title: 'Discovering Owls'
          }
        },
        {
          path: '/article/:slug',
          name: 'article',
          component: () => import('@/views/ArticlePage.vue'),
          meta: {
            title: 'Article | Discovering Owls'
          }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFound404Page.vue'),
      meta: {
        title: '404 | Page Not Found'
      }
    }
  ]
})

// Global navigation guard for setting page titles
router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string
  next()
})

export default router