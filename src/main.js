import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
// find icon names here: https://fontawesome.com/icons?d=gallery&s=solid&m=free
import { faWindowMinimize, faWindowMaximize, faBook, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Vuebar from 'vuebar'
Vue.use(Vuebar)

library.add(faWindowMinimize, faWindowMaximize, faBook, faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
