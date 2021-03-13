// Libraries
import Vuetify from 'vuetify'
import router from '../../src/router'

// Components
import LogoutButton from '@/components/LogoutButton'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'
import { Auth0Plugin } from '@/auth'
import { domain, clientId, audience } from '../../../auth_config.json'


describe('LogoutButton.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify(Auth0Plugin, {
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
  })

  it('Check Logout text', () => {
    const wrapper = mount(LogoutButton, {
      localVue,
      vuetify,
    })

    // With jest we can create snapshot files of the HTML output
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.v-btn__content').exists()).toBe(false)
  })
})
