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
    'ADD_COUNT' (state, increasement) {
      state.count = state.count + increasement
    }
  },
  actions: {},
  plugins: [
    transfer(window.parent.vm)
  ]
})