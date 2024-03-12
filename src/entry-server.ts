/*
 * @Author: kasuie
 * @Date: 2024-03-11 17:18:25
 * @LastEditors: kasuie
 * @LastEditTime: 2024-03-12 09:21:40
 * @Description:
 */
import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'

export async function render(url: string, manifest: any) {
  const { app, router, store } = createApp()
  router.push(url)
  await router.isReady()
  const ctx: any = {}
  const appHtml = await renderToString(app, ctx)
  const preloadLinks = renderPreloadLinks(ctx?.modules, manifest)
  const teleports = renderTeleports(ctx?.teleports)
  const state = JSON.stringify(store.state.value)
  return { appHtml, preloadLinks, teleports, state }
}

function renderTeleports(teleports: any) {
  if (!teleports) return ''
  return Object.entries(teleports).reduce((all, [key, value]) => {
    if (key.startsWith('#el-popper-container-')) {
      return `${all}<div id="${key.slice(1)}">${value}</div>`
    }
    return all
  }, teleports.body || '')
}

function renderPreloadLinks(modules: Array<any>, manifest: any) {
  let links = ''
  const seen = new Set()
  modules.forEach((id) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file: any) => {
        if (!seen.has(file)) {
          seen.add(file)
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

function renderPreloadLink(file: any) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else if (file.endsWith('.woff')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  } else if (file.endsWith('.woff2')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  } else if (file.endsWith('.gif')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
  } else if (file.endsWith('.png')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`
  } else {
    return ''
  }
}
