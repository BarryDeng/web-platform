import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import axios from 'axios'

import store from '@/store'
import App from '@/App'
// import Index from '@/views/index'
const Index = () => System.import('@/views/index')

Vue.prototype.$http = axios
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/codes/:id', component: Index },
]

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
})

sync(store, router)

const app = new Vue({
  // el: '#app',
  router,
  store,
  render: h => h(App),
})

export { app, router, store }
