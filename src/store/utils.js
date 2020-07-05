export default {
  state: {
    copiedToClipboard: '',
    loading: true,
    editItem: {},
    searchField: '',
    LBsearchField: '',
    commentField: '',
    rating: 1
  },
  computed: {
    upperCase () {
      this.apperCase = this.$store.getters.computedUpperCase
    }
  },
  mutations: {
    changeToClipboard (state, val) {
      state.copiedToClipboard = val
    },
    chgLoading (state, val) {
      state.loading = val
    },
    chgEditItem (state, editItem) {
      state.editItem = editItem
    },
    chgSearchField (state, searchField) {
      state.searchField = searchField
    },
    chgLBsearchField (state, LBsearchField) {
      state.LBsearchField = LBsearchField
    },
    chgCommentField (state, commentField) {
      state.commentField = commentField
    },
    chgRating (state, rating) {
      state.rating = rating
    }
  },
  actions: {
    resetStdItems ({ dispatch }) {
      dispatch('chgStdFPCatGroup', {})
      dispatch('chgStdFPTagGroup', {})
    },
    changeToClipboard ({ commit }, val) {
      commit('changeToClipboard', val)
    },
    chgLoading ({ commit }, val) {
      commit('chgLoading', val)
    },
    clearFields ({ commit }) {
      commit('chgSearchField', '')
      commit('chgCommentField', '')
      commit('chgRating', 1)
    },
    chgEditItem ({ commit }, editItem) {
      commit('chgEditItem', editItem)
    },
    chgSearchField ({ commit }, val) {
      commit('chgSearchField', val)
    },
    chgLBsearchField ({ commit }, LBsearchField) {
      commit('chgLBsearchField', LBsearchField)
    },
    chgCommentField ({ commit }, commentField) {
      commit('chgCommentField', commentField)
    },
    chgRating ({ commit }, rating) {
      commit('chgRating', rating)
    }
  },
  getters: {
    computedCopiedToClipboard (state) {
      return state.copiedToClipboard
    },
    loading (state) {
      return state.loading
    },
    editItem (state) {
      return state.editItem
    },
    searchField (state) {
      return state.searchField
    },
    LBsearchField (state) {
      return state.LBsearchField
    },
    commentField (state) {
      return state.commentField
    },
    rating (state) {
      return state.rating
    }
  },
  methods: {
    checkToClipboardText (value) {
      if (this.upperCase) {
        this.$store.dispatch('changeToClipboard', value.toUpperCase())
      } else {
        // console.log(state.upperCase)
        this.$store.dispatch('changeToClipboard', value)
      }
      this.copyToClipboard(value)
    },
    checkToClipboardNum (value) {
      if (!isNaN(value)) {
        this.$store.dispatch('changeToClipboard', value)
        this.copyToClipboard(value)
      } else {
        this.$store.dispatch('changeSnackBar',
          {
            timeout: 1000,
            text: 'Значение должно быть числом!!!',
            color: 'red lighten-1'
          })
      }
    },
    copyToClipboard () {
      this.$copyText(this.copiedToClipboard).then(() => {
        this.$store.dispatch('changeSnackBar', {
          timeout: 1000,
          text: 'Сохранено успешно!',
          color: 'success'
        })
      }, () => {
        this.$store.dispatch('changeSnackBar', {
          timeout: 1000,
          text: 'Не удалось сохранить(:',
          color: 'red lighten-1'
        })
      })
    }
  }
}
