export default {
  state: {
    copiedToClipboard: ''
  },
  computed: {
    upperCase () {
      this.apperCase = this.$store.getters.computedUpperCase
    }
  },
  mutations: {
    changeToClipboard (state, val) {
      state.copiedToClipboard = val
    }
  },
  actions: {
    changeToClipboard ({ commit }, val) {
      commit('changeToClipboard', val)
    }
  },
  getters: {
    computedCopiedToClipboard (state) {
      return state.copiedToClipboard
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
