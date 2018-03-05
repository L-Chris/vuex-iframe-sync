import Vue from 'vue'
import App from './app.vue'
import store from './store/app'

window.vm = new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})