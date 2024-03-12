/*
 * @Author: kasuie
 * @Date: 2024-03-11 17:31:50
 * @LastEditors: kasuie
 * @LastEditTime: 2024-03-12 10:05:27
 * @Description:
 */
import fs from 'fs'
import path from 'path'
import express from 'express'

const resolve = (p) => path.resolve(p)
const isProd = process.env.NODE_ENV === 'production'

export async function createServer() {
  const app = express()

  let vite
  if (isProd) {
    app.use((await import('compression')).default())
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false
      })
    )
  } else {
    vite = await (
      await import('vite')
    ).createServer({
      root: resolve('.'),
      logLevel: 'info',
      appType: 'custom',
      server: {
        middlewareMode: true,
        watch: {
          //编辑文件的速度太快，有时会出现 chokidar 错过更改事件，因此强制执行轮询以确保一致性
          usePolling: true,
          interval: 100
        }
      }
    })
    app.use(vite.middlewares)
  }

  const manifest = isProd
    ? fs.readFileSync(resolve('./dist/client/.vite/ssr-manifest.json'), 'utf-8')
    : {}

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl || req.url
    try {
      let template, render
      if (isProd) {
        template = fs.readFileSync(resolve('./dist/client/index.html'), 'utf-8')
        render = (await import('./dist/server/entry-server.js')).render
      } else {
        template = await vite.transformIndexHtml(
          url,
          fs.readFileSync(resolve('index.html'), 'utf-8')
        )
        render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
      }

      const { appHtml, preloadLinks, teleports, state } = await render(url, manifest)

      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
        .replace(`<!--app-store-->`, state)
        .replace(/(\n|\r\n)\s*<!--app-teleports-->/, teleports)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite?.ssrFixStacktrace(e)
      next()
    }
  })

  return { app, isProd }
}

createServer().then(({ app }) =>
  app.listen(3000, () => {
    console.log('http://localhost:3000')
  })
)
