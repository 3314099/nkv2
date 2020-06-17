export default {
  state: {
    snackBar: false,
    timeout: 2000,
    text: '',
    color: 'success'
  },
  mutations: {
    changeSnackBar (state, payload) {
      state.snackBar = true
      state.timeout = payload.timeout
      state.text = payload.text
      state.color = payload.color
    },
    falseSnackBar (state) {
      state.snackbar = false
    }
  },
  actions: {
    changeSnackBar ({ commit }, payload) {
      commit('changeSnackBar', payload)
    },
    setSnackBar ({ commit }, payload) {
      commit('falseSnackBar', payload)
    }
  },
  getters: {
    computedSnackBar (state) {
      return state.snackbar
    },
    computedTimeout (state) {
      return state.timeout
    },
    computedText (state) {
      return state.text
    },
    computedColor (state) {
      return state.color
    }
  }
}
