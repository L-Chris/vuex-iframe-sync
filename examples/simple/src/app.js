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
    IframeSync.broadcast('frameId1,frameId2')
  ]
})

new Vue({
  el: '#app',
  store,
  template:
  '<div>' +
    '<iframe id="frameId1" src="./appFrame.html" style="width:100%;"/>' +
    '<iframe id="frameId2" v-if="iframe2Visible" src="./appFrame.html" style="width:100%;"/>' +
    '<button @click="handleClick">Add from parent</button>' +
    ' {{$store.state.count}}' +
    '<input v-model.number="increasement" style="margin-left:24px;"/>' +
  '</div>',
  data () {
    return {
      increasement: 1,
      iframe2Visible: false
    }
  },
  methods: {
    handleClick () {
      this.$store.commit('ADD_COUNT', this.increasement)
    }
  },
  mounted () {
    const that = this
    setTimeout(function () {
      that.iframe2Visible = true
    }, 3000)
  }
})