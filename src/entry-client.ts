/*
 * @Author: kasuie
 * @Date: 2024-03-11 17:26:17
 * @LastEditors: kasuie
 * @LastEditTime: 2024-03-11 18:01:16
 * @Description:
 */
import { createApp } from './main'

const { app, router } = createApp()

router.isReady().then(() => {
  console.log('client render>>>', new Date().getMilliseconds())
  app.mount('#app')
})
