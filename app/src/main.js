import Vue from 'vue'
import Vuex from 'vuex'
import store from './vuex/store'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
//import VueMaterialComponents from 'vue-material-components'
//import 'vue-material-components/assets/css/materialize.min.css'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons/iconfont/material-icons.css"
import "material-icons/css/material-icons.css";

import App from './App'
import routes from './routes'

//Vue.use(VueMaterialComponents)
Vue.use(VueMaterial) //Required to boot vue material
Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.config.debug = true
Vue.material.registerTheme('default', {
  primary: 'lime',
  accent: 'light-green'
})

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  store,
  router,
  ...App
}).$mount('#app')
