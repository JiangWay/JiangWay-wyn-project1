import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import db from '@/firebase/init'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  db,
  render: h => h(App)
}).$mount('#app')
