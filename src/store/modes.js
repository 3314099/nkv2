export default {
  state: {
    LbMode: 'catGroups',
    sortButton: 'alphabet',
    RBtn: 'all',
    LBsortButton: 'alphabet'
  },
  mutations: {
    chgLbMode (state, LbMode) {
      state.mainPageMode = LbMode
    },
    chgSortButton (state, sortButton) {
      state.sortButton = sortButton
    },
    chgLBsortButton (state, LBsortButton) {
      state.LBsortButton = LBsortButton
    },
    chgRBtn (state, RBtn) {
      state.RBtn = RBtn
    }
  },
  actions: {
    chgLbMode ({ commit }, LbMode) {
      commit('chgLbMode', LbMode)
    },
    chgSortButton ({ commit }, sortButton) {
      commit('chgSortButton', sortButton)
    },
    chgLBsortButton ({ commit }, LBsortButton) {
      commit('chgLBsortButton', LBsortButton)
    },
    chgRBtn ({ commit }, RBtn) {
      commit('chgRBtn', RBtn)
    }
  },
  getters: {
    LbMode (state) {
      return state.LbMode
    },
    sortButton (state) {
      return state.sortButton
    },
    LBsortButton (state) {
      return state.LBsortButton
    },
    RBtn (state) {
      return state.RBtn
    }
  }
}
