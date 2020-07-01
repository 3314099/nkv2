import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/auth.js'
import FPmodes from '@/store/FinPlan/FPmodes.js'
import utils from '@/store/utils.js'
import colorPicker from '@/store/colorPicker.js'
import modes from '@/store/modes.js'
import snackBar from '@/store/snackBar.js'
import targets from '@/store/targets.js'
import FPsections from '@/store/FinPlan/FPsections.js'
import FPcategories from '@/store/FinPlan/FPcategories.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    auth,
    FPmodes,
    utils,
    colorPicker,
    modes,
    snackBar,
    targets,
    FPsections,
    FPcategories
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
