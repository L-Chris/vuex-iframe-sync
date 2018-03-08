import Vue from 'vue'
import Vuex from 'vuex'
import {transfer} from '../../../../src'

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
    transfer(window.parent.vm, {
      created (id) {
        console.log(`iframe[${id}]: created`)
      },
      destroyed (id) {
        console.log(`iframe[${id}]: destroyed`)
      }
    })
  ]
})