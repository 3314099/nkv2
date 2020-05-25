export default {
  state: {
    mainPageMode: 'mainC',
    pageMode: 'user',
    rightBarMode: 'calendar',
    visibility: true,
    propertyTabMode: 'targets'
  },
  mutations: {
    chgMainPageMode (state, mainPageMode) {
      state.mainPageMode = mainPageMode
    },
    chgPageMode (state, pageMode) {
      state.pageMode = pageMode
    },
    chgRightBarMode (state, rightBarMode) {
      state.rightBarMode = rightBarMode
    },
    chgVisibility (state) {
      state.visibility = !state.visibility
    },
    chgPropertyTabMode (state, propertyTabMode) {
      state.propertyTabMode = propertyTabMode
    }
  },
  actions: {
    chgMainPageMode ({ commit }, mainPageMode) {
      commit('chgMainPageMode', mainPageMode)
    },
    chgPageMode ({ commit }, pageMode) {
      commit('chgPageMode', pageMode)
    },
    chgRightBarMode ({ commit }, rightBarMode) {
      commit('chgRightBarMode', rightBarMode)
    },
    chgVisibility ({ commit }) {
      commit('chgVisibility')
    },
    chgPropertyTabMode ({ commit }, propertyTabMode) {
      commit('chgPropertyTabMode', propertyTabMode)
    }
  },
  getters: {
    mainPageMode (state) {
      return state.mainPageMode
    },
    pageMode (state) {
      return state.pageMode
    },
    rightBarMode (state) {
      return state.rightBarMode
    },
    visibility (state) {
      return state.visibility
    },
    propertyTabMode (state) {
      return state.propertyTabMode
    }
  }
}
