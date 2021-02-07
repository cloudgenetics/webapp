// Libraries
import Vuetify from 'vuetify'

// Components
import Footer from '@/components/Footer'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

describe('Footer.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('should have copyright info', () => {
    const wrapper = mount(Footer, {
      localVue,
      vuetify,
    })

    // With jest we can create snapshot files of the HTML output
    //expect(wrapper.html()).toMatchSnapshot()

    // We could also verify this differently
    // by checking the text content
    const title = wrapper.find('.v-footer > span')
    console.log(title)
    const copyright_info = '\u00A9 ' + new Date().getFullYear() + ' ' + process.env.VUE_APP_TITLE ;
    expect(title.text()).toBe(copyright_info)
  })
})
