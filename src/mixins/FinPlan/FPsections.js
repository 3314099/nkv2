import utils from '@/mixins/utils.js'
export default {
  mixins: [utils],
  methods: {
    MXFPsectionsSerial () {
      return this.$store.getters.FPsectionsSerial || []
    },
    MXFPsections () {
      return this.$store.getters.FPsections || []
    },
    MXFPsectionsSortedBysectionsSerial () {
      return this.MXFPsections() ? this.UsortFromObjectsArrayByArray(
        this.MXFPsections(), this.MXFPsectionsSerial(), 'id'
      ) : []
    },
    MXFPsectionsSortedByVisibleButton () {
      return this.UsortByVisibleButton(this.MXFPsectionsSortedBysectionsSerial())
    },
    MXsortedRuEnFPSections () {
      return this.UsortRuEnArray(this.MXFPsectionsSortedByVisibleButton(), this.UsearchField())
    },
    MXFPsecGroups () {
      return this.$store.getters.FPsecGroups || []
    },
    MXFPSecGroupsSortedByVisibleButton () {
      return this.UsortByVisibleButton(this.MXFPsecGroups())
    },
    MXFPSecGroupsSortedBySortButton () {
      return this.MXFPSecGroupsSortedByVisibleButton() ? this.UsortBySortButton(
        this.MXFPSecGroupsSortedByVisibleButton(), this.$store.getters.sortButton) : []
    },
    MXsortedRuEnFPsecGroups () {
      return this.UsortRuEnArray(this.MXFPSecGroupsSortedBySortButton(), this.UsearchField())
    },
    MXcolorsIgnoreArray () {
      return this.UarrayFromObjectsArrayByField(this.MXFPsections(), 'color')
    },
    async MXtoCreateFPSection (item) {
      try {
        const createdItem = await this.$store.dispatch('DBcreateFPSection', {
          title: item.title,
          comment: item.comment,
          color: item.color,
          visible: item.visible
        })
        this.MXcreatedFPSection(createdItem)
      } catch (e) {
        // console.log('error')
      }
    },
    async MXtoCreateFPsecGroup (item) {
      try {
        const createdItem = await this.$store.dispatch('DBcreateFPsecGroup', {
          title: item.title,
          comment: item.comment,
          rating: item.rating,
          visible: item.visible
        })
        this.MXcreatedFPsecGroup(createdItem)
      } catch (e) {
        // console.log('error')
      }
    },
    MXcreatedFPsecGroup (item) {
      const FPsecGroups = this.MXFPsecGroups().concat(item)
      this.$store.dispatch('updateFPsecGroups', FPsecGroups)
      this.$store.dispatch('chgLoading', 'false')
    },
    async MXtoEditFPSectionSerial (FPsectionsSerial) {
      try {
        await this.$store.dispatch('DBeditFPSectionsSerial', {
          FPsectionsSerial
        })
      } catch (e) {
        // console.log('error')
      }
    },
    async MXtoEditFPsecGroup (item) {
      try {
        const updatedSecGroup = await this.$store.dispatch('DBeditFPsecGroup', {
          id: item.id,
          title: item.title,
          comment: item.comment,
          rating: item.rating,
          visible: item.visible
        })
        this.MXupdatedFPsecGroup(updatedSecGroup)
      } catch (e) {
        // console.log('error')
      }
    },
    MXupdatedFPsecGroup (updatedSecGroup) {
      const FPsecGroups = this.MXFPsecGroups().map(FPsecGroup => FPsecGroup.id ===
      updatedSecGroup.id ? updatedSecGroup : FPsecGroup)
      this.$store.dispatch('updateFPsecGroups', FPsecGroups)
    },
    MXcreatedFPSection (item) {
      const FPsections = this.MXFPsections().concat(item)
      this.$store.dispatch('updateFPSections', FPsections)
      this.MXtoEditFPSectionSerial(this.UarrayFromObjectsArrayByField(FPsections, 'id'))
      this.$store.dispatch('chgLoading', 'false')
    },
    async MXtoEditFPSection (item) {
      try {
        const updatedSection = await this.$store.dispatch('DBeditFPSection', {
          id: item.id,
          title: item.title,
          comment: item.comment,
          color: item.color,
          visible: item.visible
        })
        this.MXupdatedFPSection(updatedSection)
      } catch (e) {
        // console.log('error')
      }
    },
    MXupdatedFPSection (updatedSection) {
      const sections = this.MXFPsectionsSortedBysectionsSerial().map(section => section.id ===
      updatedSection.id ? updatedSection : section)
      this.$store.dispatch('updateFPSections', sections)
      this.MXtoEditFPSectionSerial(this.UarrayFromObjectsArrayByField(sections, 'id'))
    },
    async MXtoRemoveFPSection (id) {
      try {
        await this.$store.dispatch('DBremoveFPSection', id)
        const sections = this.MXFPsections().filter(section => section.id !== id)
        this.$store.dispatch('updateFPSections', sections)
        this.MXtoEditFPSectionSerial(this.UarrayFromObjectsArrayByField(sections, 'id'))
      } catch (e) {
        // console.log('error')
      }
    },
    async MXtoRemoveFPsecGroup (id) {
      try {
        await this.$store.dispatch('DBremoveFPsecGroup', id)
        const FPsecGroups = this.MXFPsecGroups().filter(FPsecGroups => FPsecGroups.id !== id)
        this.$store.dispatch('updateFPsecGroups', FPsecGroups)
      } catch (e) {
        // console.log('error')
      }
    }
  }
}
