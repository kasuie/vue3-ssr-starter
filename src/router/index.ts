/*
 * @Author: kasuie
 * @Date: 2024-03-11 17:12:33
 * @LastEditors: kasuie
 * @LastEditTime: 2024-03-11 17:42:52
 * @Description:
 */
import { createRouter as _createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import About from '../views/AboutView.vue'

// const pages = import.meta.glob('./pages/*.vue')

const routes = [
  {
    path: '/',
    component: HomeView,
    name: 'home'
  },
  {
    path: '/about',
    component: About,
    name: 'about'
  },
]
export function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AboutView.vue')
//     }
//   ]
// })

// export default router
