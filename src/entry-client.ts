/*
 * @Author: kasuie
 * @Date: 2024-03-11 17:26:17
 * @LastEditors: kasuie
 * @LastEditTime: 2024-03-12 10:06:13
 * @Description:
 */
import { createApp } from './main'

const { app, router, store } = createApp()

if (window?.__INITIAL_STATE__) {
  store.state.value = JSON.parse(JSON.stringify(window.__INITIAL_STATE__))
}

router.beforeResolve((to, from, next) => {
  if (from && !from.name) {
    return next()
  }
})

router.isReady().then(() => {
  app.mount('#app')
})
