// Libraries
import Vuetify from 'vuetify'

// Components
import App from '@/App'
import router from '../src/router'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'
import { Auth0Plugin } from '@/auth'
import { domain, clientId, audience } from '../../auth_config.json'

describe('App.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify(Auth0Plugin, {
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
  })

  it('should have company name', () => {
    const wrapper = mount(App, {
      localVue,
      vuetify
    })

    // With jest we can create snapshot files of the HTML output
    //expect(wrapper.html()).toMatchSnapshot()
    // Check the text content
    const company = wrapper.find('.v-toolbar__title')
    const company_name = process.env.VUE_APP_TITLE
    expect(company.text()).toBe(company_name)
  })
})
