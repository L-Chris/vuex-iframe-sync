import Vue from 'vue'
import Vuex from 'vuex'
import {transfer} from '../../../../index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {},
  mutations: {
    'ADD_COUNT' (state) {
      state.count = state.count + 1
    }
  },
  actions: {},
  plugins: [
    transfer(window.parent.vm)
  ]
})