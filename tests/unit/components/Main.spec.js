// Libraries
import Vuetify from 'vuetify'

// Components
import Main from '@/components/Main'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

describe('Main.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('should have company name', () => {
    const wrapper = mount(Main, {
      localVue,
      vuetify,
    })

    // With jest we can create snapshot files of the HTML output
    //expect(wrapper.html()).toMatchSnapshot()

    // We could also verify this differently
    // by checking the text content
    const company = wrapper.find('.companyname')
    const company_name = process.env.VUE_APP_TITLE ;
    expect(company.text()).toBe(company_name)
  })
})
