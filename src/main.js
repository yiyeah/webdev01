import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// axios
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = "http://localhost:8090"
//element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI)

//quill
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import 'animate.css'
import {WOW} from 'wowjs'
Vue.prototype.$wow = new WOW({
  boxClass: 'wow', // default
  animateClass: 'animated', // default
  offset: 150, // default
  mobile: true, // default
  live: true, // default
  callback: function(box) {
    console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
  }
})
