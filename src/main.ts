/*
 * @Author: kasuie
 * @Date: 2024-03-11 17:12:33
 * @LastEditors: kasuie
 * @LastEditTime: 2024-03-11 18:02:28
 * @Description:
 */
import './assets/main.css'
import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router'

export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  app.use(router)
  console.log('main>>>', new Date().getMilliseconds())

  return { app, router }
}
