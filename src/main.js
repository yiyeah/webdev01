import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = "http://43.140.248.122:8090"
// axios.defaults.baseURL = "http://localhost:8090"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
