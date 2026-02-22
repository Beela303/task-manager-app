import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tasks'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tasks'
      },
      {
        path: 'tasks',
        component: () => import('@/views/tasks.vue')
      },
      {
        path: 'add',
        component: () => import('@/views/add.vue')
      },
      {
        path: 'statistics',
        component: () => import('@/views/statistics.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
