import Vue from 'vue'
import Vuex from 'vuex'
import {transfer} from '../../../../index'

Vue.use(Vuex)

const config = {
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
}

export default new Vuex.Store(config)