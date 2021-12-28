import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Authentication modules
const authmodule = {
    namespaced: true,
    state: {
        // authentication status
        authStatus: false,
        accessToken: ''
    },
    getters: {
        getstatus: (state) => {
            return state.authStatus
        }
    },
    mutations: {
        activate(state) {
            state.authStatus = true
        },
        deactivate(state) {
            state.authStatus = false
        }
    }
}

// Store
const store = new Vuex.Store({
    modules: {
        auth: authmodule
    }
})

export default store