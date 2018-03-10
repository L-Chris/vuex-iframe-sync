var store = new Vuex.Store({
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
    IframeSync.transfer({
      created (id) {
        console.log(`iframe[${id}]: created`)
      },
      destroyed (id) {
        console.log(`iframe[${id}]: destroyed`)
      }
    })
  ]
})

new Vue({
  el: '#app',
  store,
  template:
  '<div>' +
    '<button @click="handleClick">Add from iframe</button>' +
    ' {{$store.state.count}}' +
    '<input v-model.number="increasement" style="margin-left:24px;"/>' +
  '</div>',
  data () {
    return {
      increasement: 1
    }
  },
  methods: {
    handleClick () {
      this.$store.commit('ADD_COUNT', this.increasement)
    }
  }
})