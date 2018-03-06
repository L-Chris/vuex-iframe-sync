import Vue from 'vue'
import AppFrame from './appFrame.vue'
import store from './store/appFrame'

new Vue({
  el: '#app',
  store,
  components: { AppFrame },
  template: '<AppFrame/>'
})