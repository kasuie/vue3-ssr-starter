/*
 * @Author: kasuie
 * @Date: 2024-03-11 17:12:33
 * @LastEditors: kasuie
 * @LastEditTime: 2024-03-12 09:43:44
 * @Description:
 */
import { createRouter as _createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import About from '../views/AboutView.vue'

// const pages = import.meta.glob('./pages/*.vue')

export function createRouter() {
  const router = _createRouter({
    scrollBehavior() {
      return { top: 0 }
    },
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes: [
      {
        path: '/',
        component: HomeView,
        name: 'home'
      },
      {
        path: '/about',
        component: About,
        name: 'about'
      }
    ]
  })

  router.beforeEach((/* to, from */) => {
    if (!import.meta.env.SSR) {
      // start progress bar
    }
  })

  router.afterEach(() => {
    if (!import.meta.env.SSR) {
      // finish progress bar
    }
  })

  return router
}
