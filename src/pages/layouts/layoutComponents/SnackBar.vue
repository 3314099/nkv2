<template>
  <div class="text-center">
    <v-snackbar
      v-model="getSnackBar"
      :timeout= "timeout"
      :text= "text"
      :color="color"
      top
    >
      {{text}}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  computed: {
    getSnackBar: {
      get () { return this.$store.getters.computedSnackBar },
      set (newValue) { return this.$store.dispatch('setSnackBar', newValue) }
    },

    timeout () {
      return this.$store.getters.computedTimeout
    },
    text () {
      return this.$store.getters.computedText
    },
    color () {
      return this.$store.getters.computedColor
    }
  },
  methods: {
    copyToClipboard (text) {
      this.$copyText(text).then(() => {
        this.$store.dispatch('changeSnackBar', {
          text: 'Сохранено успешно!',
          color: 'success'
        })
      }, () => {
        this.$store.dispatch('changeSnackBar', {
          text: 'Не удалось сохранить(:',
          color: 'red lighten-1'
        })
      })
    }
  }

}
</script>
