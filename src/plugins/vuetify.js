import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.grey.darken3,
        secondary: colors.grey.lighten4,
        accent: colors.grey.base,
        error: colors.red.darken3,
      },
    },
  },
})
