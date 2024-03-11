/*
 * @Author: kasuie
 * @Date: 2024-03-11 17:18:25
 * @LastEditors: kasuie
 * @LastEditTime: 2024-03-11 18:02:52
 * @Description:
 */
import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'

export async function render(url: string) {
  const { app, router } = createApp()
  console.log('server render>>>')

  router.push(url)
  await router.isReady()
  console.log('server render1111>>>')

  const ctx = {}
  const html = await renderToString(app, ctx)
  console.log('server render2222>>>')
  return { html }
}
