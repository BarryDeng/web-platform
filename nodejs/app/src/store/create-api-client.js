import axios from 'axios'

const instance = axios.create({
	responseType: 'json'
})

function warp (code) {
	try {
        const ret = eval(`(function (module, exports, require) { ${code} })`)
		if (typeof ret !== 'function') {
            throw new Error('type not valid')
        }
        return ret.toString()
    } catch (e) {
        return 'function (module, exports, require) {  }'
    }
}

export function fetchModule (id) {
	return instance.get(`/codes/${id}`)
		.then(resp => {
			const {desp, code} = resp.data
			return Promise.resolve({
				code,
				desp,
			})
		})
}

export function fetchDep (id) {
	return instance.get(`/codes/${id}`).then(resp => {
		const {code} = resp.data
		return Promise.resolve({
			code: warp(code),
		})
	})
}
