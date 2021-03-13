// Libraries
import Vuetify from 'vuetify'

// Components
import LoginButton from '@/components/LoginButton'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

describe('LoginButton.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('Check login text', () => {
    const wrapper = mount(LoginButton, {
      localVue,
      vuetify,
    })

    // With jest we can create snapshot files of the HTML output
    expect(wrapper.html()).toMatchSnapshot()

    // We could also verify this differently
    // by checking the text content
    const accountText = wrapper.find('.v-btn__content')
    const status = 'Log In';
    expect(accountText.text()).toBe(status)
  })
})
