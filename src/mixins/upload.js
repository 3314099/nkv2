export default {
  methods: {
    async MXuploadFPSections () {
      await this.$store.dispatch('fetchFPSections')
      await this.$store.dispatch('fetchFPSectionsSerial')
      this.$store.dispatch('chgLoading', 'false')
    },
    async MXuploadFPsecGroups () {
      await this.$store.dispatch('fetchFPsecGroups')
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
    async MXuploadFPtagGroups () {
      await this.$store.dispatch('fetchFPTagGroups')
      this.$store.dispatch('chgLoading', 'false')
    },
    async MXuploadFPTags () {
      await this.$store.dispatch('fetchFPTags')
      this.$store.dispatch('chgLoading', 'false')
    }
  }
}
