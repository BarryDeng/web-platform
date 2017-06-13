const router = require('koa-router')()
const shortid = require('shortid')
const _ = require('lodash')
const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')

const logger = new (winston.Logger)({
  transports: [
    new DailyRotateFile({
      name: 'codes',
      filename: '/opt/logs/codes.log',
      level: 'info',
      colorize: true,
      maxsize: 1024 * 1024 * 10,
      datePattern:'.dd--HH'
    })
  ]
})

const prefix = s => 'code:' + s
const TTL = 10 * 60 * 1000
const MAXLEN = 500

router.post('/', async (ctx, next) => {
  const {code, deps} = ctx.request.body
  if (!_.isString(code)) {
    ctx.status = 400
    return ctx.body = {
      msg: 'code not found'
    }
  } else if (code.length > MAXLEN) {
    ctx.status = 400
    return ctx.body = {
      msg: 'code too long'
    }
  }

  if (!Array.isArray(deps) || !deps.every(id => shortid.isValid(id))) {
    ctx.status = 400
    return ctx.body = {
      msg: 'dependencies invalid'
    }
  }

  const id = shortid.generate()
  const ret = {
    code,
    deps
  }
  // logger.info('%s %s', ctx.ip, code)
  await ctx.redis.setAsync(prefix(id), JSON.stringify(ret), 'px', TTL)
  ctx.status = 201
  ctx.body = { id }
})

router.get('/:id', async (ctx, next) => {
  const { id } = ctx.params
  if (!shortid.isValid(id)) {
    ctx.status = 400
    return ctx.body = {
      msg: 'id invalid'
    }
  }

  const data = await ctx.redis.getAsync(prefix(id))
  if (!data) {
    ctx.status = 404
    return ctx.body = {
      msg: 'code not found'
    }
  }

  ctx.body = data
})

router.put('/:id', async (ctx, next) => {
  const { id } = ctx.params
  if (!shortid.isValid(id)) {
    ctx.status = 400
    return ctx.body = {
      msg: 'id invalid'
    }
  }

  const hasCode = await ctx.redis.getAsync(prefix(id))
  if (!hasCode) {
    ctx.status = 404
    return ctx.body = {
      msg: 'code not found'
    }
  }

  const {code, deps} = ctx.request.body
  if (!_.isString(code)) {
    ctx.status = 400
    return ctx.body = {
      msg: 'code not found'
    }
  } else if (code.length > MAXLEN) {
    ctx.status = 400
    return ctx.body = {
      msg: 'code too long'
    }
  }

  const ret = {
    code,
    deps,
  }
  // logger.info('%s %s', ctx.ip, code)  
  await ctx.redis.setAsync(prefix(id), JSON.stringify(ret), 'px', TTL)
  ctx.body = {}
})

module.exports = router
