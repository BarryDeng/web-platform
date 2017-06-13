const isProd = process.env.NODE_ENV === 'production'

module.exports = (type, to) => {
    return async (ctx, next) => {
        const accepts = ctx.accepts()
        if (accepts.toString().indexOf(type) === -1) {
            ctx.routerPath = to
        }

        if (!isProd && ctx.path === '/__webpack_hmr') {
            ctx.routerPath = to
        }
        await next()
    }
}
