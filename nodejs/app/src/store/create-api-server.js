import redis from '../../db/redis'
import vm from 'vm'

const prefix = s => 'code:' + s

const sandbox = {}
vm.createContext(sandbox)

function warp (code) {
    try {
        const ret = vm.runInNewContext(`(function (module, exports, require) { ${code} })`, sandbox, { timeout: 500 })
        if (typeof ret !== 'function') {
            throw new Error('type not valid')
        }
        return ret.toString()
    } catch (e) {
        return 'function (module, exports, require) { }'
    }
}

export function fetchModule (id) {
    return redis.getAsync(prefix(id)).then(data => {
        if (!data) {
            return Promise.reject()
        }
        data = JSON.parse(data)
        return Promise.resolve({
            code: data ? data.code : '',
            deps: data ? data.deps : [],
        })
    })
}

export function fetchDep (id) {
    return redis.getAsync(prefix(id)).then(data => {
        if (!data) {
            return Promise.reject()
        }
        data = JSON.parse(data)
        return Promise.resolve({
            code: warp(data ? data.code : '')
        })
    })
}
