export default {
  state: {
    leftBarMode: '',
    sortButton: 'alphabet',
    visibleButton: 'all',
    LBsortButton: 'alphabet',
    mainPageMode: 'mainC',
    pageMode: 'user',
    rightBarMode: 'store',
    visibility: true,
    propertyTabMode: 'FPsectAndGrp',
    itemMode: 'default',
    editMode: '', // '', create, edit
    tableMode: ''
  },
  mutations: {
    chgLeftBarMode (state) {
      const mode = state.pageMode + '-' + state.propertyTabMode + '-' + state.itemMode + '-' + state.editMode
      let leftBarMode = ''
      switch (mode) {
        case 'properties-FPcategories-FPcategory-create':
          leftBarMode = 'selFPCatGroups'
          break
        case 'properties-FPcategories-FPcategory-edit':
          leftBarMode = 'selFPCatGroups'
          break
        case 'properties-FPtags-default-':
          leftBarMode = 'selFPTagGroups'
          break
        default:
          leftBarMode = ''
          break
      }
      state.leftBarMode = leftBarMode
    },
    chgSortButton (state, preload) {
      state.sortButton = preload
    },
    chgLBsortButton (state, preload) {
      state.LBsortButton = preload
    },
    chgVisibleButton (state) {
      let visibleBtn = 'all'
      switch (state.visibleButton) {
        case 'all':
          visibleBtn = 'visible'
          break
        case 'visible':
          visibleBtn = 'unvisible'
          break
        case 'unvisible':
          visibleBtn = 'all'
          break
      }
      state.visibleButton = visibleBtn
    },
    chgMainPageMode (state, preload) {
      state.mainPageMode = preload
    },
    chgPageMode (state, preload) {
      state.pageMode = preload
    },
    chgRightBarMode (state, preload) {
      state.rightBarMode = preload
    },
    chgVisibility (state) {
      state.visibility = !state.visibility
    },
    chgPropertyTabMode (state, preload) {
      state.propertyTabMode = preload
    },
    chgItemMode (state, preload) {
      state.itemMode = preload
    },
    chgEditMode (state, preload) {
      state.editMode = preload
    },
    chgTableMode (state, preload) {
      state.tableMode = preload
    }
  },
  actions: {
    chgLeftBarMode ({ commit }, preload) {
      commit('chgLeftBarMode', preload)
    },
    chgSortButton ({ commit }, preload) {
      commit('chgSortButton', preload)
    },
    chgLBsortButton ({ commit }, preload) {
      commit('chgLBsortButton', preload)
    },
    chgVisibleButton ({ commit }) {
      commit('chgVisibleButton')
    },
    clearModes ({ commit }) {
      commit('chgSortButton', 'alphabet')
      commit('chgEditMode', '')
      commit('chgTableMode', '')
    },
    chgMainPageMode ({ commit }, preload) {
      commit('chgMainPageMode', preload)
    },
    chgPageMode ({ commit }, preload) {
      commit('chgPageMode', preload)
    },
    chgRightBarMode ({ commit }, preload) {
      commit('chgRightBarMode', preload)
    },
    chgVisibility ({ commit }) {
      commit('chgVisibility')
    },
    chgPropertyTabMode ({ commit }, preload) {
      commit('chgPropertyTabMode', preload)
    },
    chgEditMode ({ commit }, preload) {
      commit('chgEditMode', preload)
      commit('chgLeftBarMode')
    },
    chgItemMode ({ commit }, preload) {
      commit('chgItemMode', preload)
      commit('chgLeftBarMode')
    },
    chgTableMode ({ commit }, preload) {
      commit('chgTableMode', preload)
    }
  },
  getters: {
    leftBarMode (state) {
      return state.leftBarMode
    },
    sortButton (state) {
      return state.sortButton
    },
    LBsortButton (state) {
      return state.LBsortButton
    },
    visibleButton (state) {
      return state.visibleButton
    },
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
