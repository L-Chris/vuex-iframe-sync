import Vue from 'vue'
import Vuex from 'vuex'
import {broadcast} from '../../../../index'

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
    broadcast('frameId1,frameId2')
  ]
})