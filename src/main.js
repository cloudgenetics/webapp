import Vue from 'vue'
import App from './App.vue'
import Axios from './plugins/axios'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import { Auth0Plugin } from './auth'

import { domain, clientId, audience } from '../auth_config.json'

Vue.config.productionTip = false

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

Vue.use(Axios)

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
