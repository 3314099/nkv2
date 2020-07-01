export default {
  methods: {
    async MXuploadFPSections () {
      await this.$store.dispatch('fetchFPSections')
      await this.$store.dispatch('fetchFPSectionsSerial')
      this.$store.dispatch('chgLoading', 'false')
    },
    async MXuploadFPCatGroups () {
      await this.$store.dispatch('fetchFPCatGroups')
      this.$store.dispatch('chgLoading', 'false')
    },
    async MXuploadFPCategories () {
      await this.$store.dispatch('fetchFPCategories')
      this.$store.dispatch('chgLoading', 'false')
    },
    async MXuploadFPsecGroups () {
      await this.$store.dispatch('fetchFPsecGroups')
      this.$store.dispatch('chgLoading', 'false')
    }
  }
}
