import { createStore } from 'vuex'

import test from './modules/test'

export default createStore({
  modules: {
    test
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  strict: process.env.NODE_ENV !== 'production' // 严格模式
})