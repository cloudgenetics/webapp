import Vue from 'vue'
import Vuetify from 'vuetify'
import router from '../src/router'

import { Auth0Plugin } from '../src/auth'

import { domain, clientId, audience } from '../auth_config.json'

Vue.config.productionTip = false

Vue.use(Vuetify);
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  router,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})
Vue.config.productionTip = false;
