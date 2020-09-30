import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import liUi from './../packages/index'
Vue.use(liUi)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
