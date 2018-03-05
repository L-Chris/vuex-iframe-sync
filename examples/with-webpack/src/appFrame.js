import Vue from 'vue'
import AppFrame from './appFrame.vue'
import store from './store/appFrame'

window.vm = new Vue({
  el: '#app',
  store,
  components: { AppFrame },
  template: '<AppFrame/>'
})