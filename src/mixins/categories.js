import utils from '@/mixins/utils.js'
export default {
  mixins: [utils],
  methods: {
    MXcatGroups () {
      const catGroups = this.$store.getters.catGroups
      return this.UsortObjectsArray(catGroups, 'rating', true)
    },
    MXsortedRuEnCatGroups () {
      return this.UsortRuEnArray(this.MXcatGroups(), this.UsearchField())
    },
    async MXtoCreateCatGroup (item) {
      try {
        const createdItem = await this.$store.dispatch('DBcreateCatGroup', {
          title: item.title,
          comment: item.comment,
          rating: item.rating
        })
        this.MXcreatedCatGroup(createdItem)
      } catch (e) {
        // console.log('error')
      }
    },
    MXcreatedCatGroup (item) {
      const catGroups = this.MXcatGroups().concat(item)
      this.$store.dispatch('updateCatGroups', catGroups)
      this.$store.dispatch('chgLoading', 'false')
    },
    async MXtoEditCatGroup (item) {
      console.log(item)
      try {
        const updatedCatGroup = await this.$store.dispatch('DBeditCatGroup', {
          id: item.id,
          title: item.title,
          comment: item.comment,
          rating: item.rating
        })
        this.MXupdatedCatGroup(updatedCatGroup)
      } catch (e) {
        // console.log('error')
      }
    },
    MXupdatedCatGroup (updatedCatGroup) {
      // console.log(updatedCatGroup)
      const catGroups = this.MXcatGroups().map(catGroup => catGroup.id ===
      updatedCatGroup.id ? updatedCatGroup : catGroup)
      this.$store.dispatch('updateCatGroups', catGroups)
    },
    async MXtoRemoveCatGroup (id) {
      try {
        await this.$store.dispatch('DBremoveCatGroup', id)
        const catGroups = this.MXcatGroups().filter(catGroup => catGroup.id !== id)
        this.$store.dispatch('updateCatGroups', catGroups)
      } catch (e) {
        // console.log('error')
      }
    }
  }
}
