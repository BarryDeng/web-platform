const Koa = require('koa')
const router = require('koa-router')()
const serve = require('koa-static')
const mount = require('koa-mount')
const bodyParser = require('koa-bodyparser')
const compress = require('koa-compress')
const app = new Koa()

const redis = require('./db/redis')
const SSR = require('./middleware/historyApiFallback')
const Codes = require('./routers/codes')
const noMatchAcceptTo = require('./middleware/match')

router
  .use('/codes', Codes.routes())
  .use('/ssr', SSR.routes())

app.context.redis = redis
app
  .use(compress())
  .use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.status || 500
      ctx.body = ctx.status === 404 ? 'Not Found' : 'Internal Server Error'
      ctx.app.emit('error', err, ctx)
    }
  })
  .use(mount('/public', serve('./public')))
  .use(mount('/dist', serve('./dist')))
  // .use(mount('/service-worker.js', serve('./dist/service-worker.js')))
  .use(noMatchAcceptTo('application/json', '/ssr'))
  .use(bodyParser())
  .use(router.routes())

app.listen(3000, _ => console.log('listen at 3000'))
