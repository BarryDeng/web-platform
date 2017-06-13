import Vue from 'vue'
import Vuex from 'vuex'
import { fetchModule, fetchDep } from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        currentCode: '',
        dependencies: {},
        snackbar: [],
    },

    actions: {
        FETCH_MODULE: ({ commit, dispatch }, { id }) => {
            return fetchModule(id)
                .then(({ code, deps }) => {
                    commit('UPDATE_CODE', { code })
                    return dispatch('FETCH_DEPS', { ids: deps })
                })
                .catch(() => dispatch('SNACKBAR_PUSH', { message: 'Module not found' }))
        },
        FETCH_DEP: ({ commit, dispatch }, { id }) => {
            return fetchDep(id)
                .then(data => commit('ADD_DEP', { id, code: data.code }))
                .catch(() => dispatch('SNACKBAR_PUSH', { message: 'Module not found' }))
        },
        FETCH_DEPS: ({ dispatch }, { ids }) => {
            const promises = ids.map(id => dispatch('FETCH_DEP', { id }))
            return Promise.all(promises)
        },
        REMOVE_DEP: ({ commit }, { id }) => {
            commit('DEL_DEP', { id })
        },
        UPDATE_CODE: ({ commit }, { code }) => {
            commit('UPDATE_CODE', { code })
        },
        SNACKBAR_POP: ({ commit }) => {
            commit('SNACKBAR_POP')
        },
        SNACKBAR_PUSH: ({ commit }, { message }) => {
            commit('SNACKBAR_PUSH', { message })
        },
    },

    mutations: {
        UPDATE_CODE: (state, { code }) => {
            state.currentCode = code
        },
        ADD_DEP: (state, { id, code }) => {
            Vue.set(state.dependencies, id, code)
        },
        DEL_DEP: (state, { id }) => {
            Vue.delete(state.dependencies, id)
        },
        SNACKBAR_POP: (state) => {
            state.snackbar.shift()
        },
        SNACKBAR_PUSH: (state, { message }) => {
            state.snackbar.push(message)
        },
    }
})

export default store
