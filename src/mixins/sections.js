import utils from '@/mixins/utils.js'
export default {
  mixins: [utils],
  methods: {
    MXsectionsSerial () {
      return this.$store.getters.sectionsSerial
    },
    MXsections () {
      const sections = this.$store.getters.sections
      return this.UsortFromObjectsArrayByArray(sections, this.MXsectionsSerial(), 'id')
    },
    MXsortedRuEnSections () {
      return this.UsortRuEnArray(this.MXsections(), this.UsearchField())
    },
    MXcolorsIgnoreArray () {
      return this.UarrayFromObjectsArrayByField(this.MXsections(), 'color')
    },
    async MXtoCreateSection (item) {
      try {
        const createdItem = await this.$store.dispatch('DBcreateSection', {
          title: item.title,
          comment: item.comment,
          color: item.color
        })
        this.MXcreatedSection(createdItem)
      } catch (e) {
        // console.log('error')
      }
    },
    async MXtoEditSectionSerial (sectionsSerial) {
      try {
        await this.$store.dispatch('DBeditSectionsSerial', {
          sectionsSerial
        })
      } catch (e) {
        // console.log('error')
      }
    },
    MXcreatedSection (item) {
      const sections = this.MXsections().concat(item)
      this.$store.dispatch('updateSections', sections)
      this.MXtoEditSectionSerial(this.UarrayFromObjectsArrayByField(sections, 'id'))
      this.$store.dispatch('chgLoading', 'false')
    },
    async MXtoEdit (item) {
      try {
        const updatedSection = await this.$store.dispatch('DBeditSection', {
          id: item.id,
          title: item.title,
          comment: item.comment,
          color: item.color
        })
        this.MXupdatedSection(updatedSection)
      } catch (e) {
        // console.log('error')
      }
    },
    MXupdatedSection (updatedSection) {
      const sections = this.MXsections().map(section => section.id ===
      updatedSection.id ? updatedSection : section)
      this.$store.dispatch('updateSections', sections)
      this.MXtoEditSectionSerial(this.UarrayFromObjectsArrayByField(sections, 'id'))
    },
    async MXtoRemove (id) {
      try {
        await this.$store.dispatch('DBremoveSection', id)
        const sections = this.MXsections().filter(section => section.id !== id)
        this.$store.dispatch('updateSections', sections)
        this.MXtoEditSectionSerial(this.UarrayFromObjectsArrayByField(sections, 'id'))
      } catch (e) {
        // console.log('error')
      }
    }
  }
}
