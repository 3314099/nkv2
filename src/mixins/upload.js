export default {
  methods: {
    async uploadSections () {
      await this.$store.dispatch('fetchSections')
      await this.$store.dispatch('fetchSectionsSerial')
      this.$store.dispatch('chgLoading', 'false')
    },
    async uploadCatGroups () {
      await this.$store.dispatch('fetchCatGroups')
      this.$store.dispatch('chgLoading', 'false')
    }
  }
}
