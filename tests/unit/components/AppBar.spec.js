// Libraries
import Vuetify from 'vuetify'

// Components
import AppBar from '@/components/AppBar'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

describe('AppBar.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('should have company name', () => {
    const wrapper = mount(AppBar, {
      localVue,
      vuetify,
    })

    // With jest we can create snapshot files of the HTML output
    //expect(wrapper.html()).toMatchSnapshot()
    // Check the text content
    const company = wrapper.find('.v-toolbar__title')
    const company_name = process.env.VUE_APP_TITLE
    expect(company.text()).toBe(company_name)
  })
})
