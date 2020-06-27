export default {
  state: {
    mainPageMode: 'mainC',
    pageMode: 'user',
    rightBarMode: 'calendar',
    visibility: true,
    propertyTabMode: 'FPsectAndGrp',
    itemMode: 'default',
    editMode: '', // '', create, edit
    tableMode: ''
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
    },
    chgItemMode (state, itemMode) {
      state.itemMode = itemMode
    },
    chgEditMode (state, editMode) {
      state.editMode = editMode
    },
    chgTableMode (state, tableMode) {
      state.tableMode = tableMode
    }
  },
  actions: {
    clearModes ({ commit }) {
      commit('chgSortButton', 'alphabet')
      commit('chgItemMode', 'default')
      commit('chgEditMode', '')
      commit('chgTableMode', '')
    },
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
    },
    chgEditMode ({ commit }, editMode) {
      commit('chgEditMode', editMode)
    },
    chgItemMode ({ commit }, itemMode) {
      commit('chgItemMode', itemMode)
    },
    chgTableMode ({ commit }, tableMode) {
      commit('chgTableMode', tableMode)
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
    },
    itemMode (state) {
      return state.itemMode
    },
    editMode (state) {
      return state.editMode
    },
    tableMode (state) {
      return state.tableMode
    }
  }
}
