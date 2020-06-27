import utils from '@/mixins/utils.js'
export default {
  mixins: [utils],
  methods: {
    MXFPsectionsSerial () {
      const MXFPsectionsSerial = this.$store.getters.FPsectionsSerial
      if (MXFPsectionsSerial) {
        return MXFPsectionsSerial
      } else {
        return []
      }
    },
    MXFPsections () {
      const sections = this.$store.getters.FPsections
      if (sections) {
        return this.UsortFromObjectsArrayByArray(sections, this.MXFPsectionsSerial(), 'id')
      } else {
        return []
      }
    },
    MXsortedRuEnFPSections () {
      return this.UsortRuEnArray(this.MXFPsections(), this.UsearchField())
    },
    MXcolorsIgnoreArray () {
      return this.UarrayFromObjectsArrayByField(this.MXFPsections(), 'color')
    },
    async MXtoCreateFPSection (item) {
      try {
        const createdItem = await this.$store.dispatch('DBcreateFPSection', {
          title: item.title,
          comment: item.comment,
          color: item.color
        })
        this.MXcreatedFPSection(createdItem)
      } catch (e) {
        // console.log('error')
      }
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
          color: item.color
        })
        this.MXupdatedFPSection(updatedSection)
      } catch (e) {
        // console.log('error')
      }
    },
    MXupdatedFPSection (updatedSection) {
      const sections = this.MXFPsections().map(section => section.id ===
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
    }
  }
}
