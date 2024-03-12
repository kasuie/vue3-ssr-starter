/*
 * @Author: kasuie
 * @Date: 2024-03-11 17:12:33
 * @LastEditors: kasuie
 * @LastEditTime: 2024-03-12 09:22:43
 * @Description:
 */
import './assets/main.css'
import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router'
import { createPinia } from 'pinia'

export function createApp() {
  const app = createSSRApp(App)
  const store = createPinia()
  const router = createRouter()
  app.use(router).use(store)
  return { app, router, store }
}
