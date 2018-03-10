import Vue from 'vue'
import App from './app.vue'
import store from './store/app'

new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})