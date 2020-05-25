import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/auth.js'
import modes from '@/store/modes.js'
import utils from '@/store/utils.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    modes,
    utils
  },
  state: {
    error: null
  },
  mutations: {
    setError (state, error) {
      console.log(error)
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  }

})
