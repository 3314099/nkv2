import utils from '@/mixins/utils.js'
export default {
  mixins: [utils],
  methods: {
    MXFPcatGroups () {
      return this.$store.getters.FPcatGroups.filter((catGroup) => catGroup.id) || []
    },
    MXFPcatGroupsSortedByVisibleButton () {
      return this.UsortByVisibleButton(this.MXFPcatGroups())
    },
    MXFPcatGroupsSortedBySortButton () {
      return this.MXFPcatGroupsSortedByVisibleButton() ? this.UsortBySortButton(
        this.MXFPcatGroupsSortedByVisibleButton()) : []
    },
    MXsortedRuEnFPcatGroups () {
      return this.UsortRuEnArray(this.MXFPcatGroupsSortedBySortButton(), this.UsearchField())
    },
    MXLBFPcatGroups () {
      return this.MXFPcatGroups()
    },
    MXsortedRuEnLBFPcatGroups () {
      return this.UsortRuEnArray(this.MXLBFPcatGroups(), this.ULBsearchField())
    },
    MXFPcategories () {
      return this.$store.getters.FPcategories
    },
    MXFPcategoriesSortedByVisibleButton () {
      return this.UsortByVisibleButton(this.MXFPcategories())
    },
    MXFPcategoriesSortedBySortButton () {
      return this.MXFPcategoriesSortedByVisibleButton() ? this.UsortBySortButton(
        this.MXFPcategoriesSortedByVisibleButton()) : []
    },
    MXsortedRuEnFPcategories () {
      return this.UsortRuEnArray(this.MXFPcategoriesSortedBySortButton(), this.UsearchField())
    },
    async MXtoCreateFPCatGroup (item) {
      try {
        const createdItem = await this.$store.dispatch('DBcreateFPCatGroup', {
          title: item.title,
          comment: item.comment,
          rating: item.rating,
          visible: item.visible
        })
        this.MXcreatedFPCatGroup(createdItem)
      } catch (e) {
        // console.log('error')
      }
    },
    MXcreatedFPCatGroup (item) {
      const FPcatGroups = this.MXFPcatGroups().concat(item)
      this.$store.dispatch('updateFPCatGroups', FPcatGroups)
      this.$store.dispatch('chgLoading', 'false')
    },
    async MXtoCreateFPCategory (item) {
      try {
        const createdItem = await this.$store.dispatch('DBcreateFPCategory', {
          title: item.title,
          parentId: item.parentId,
          comment: item.comment,
          expenses: item.expenses,
          entrances: item.entrances,
          catVisible: item.catVisible
        })
        this.MXcreatedFPCategory(createdItem)
      } catch (e) {
        // console.log('error')
      }
    },
    MXcreatedFPCategory (item) {
      const categories = this.MXFPcategories().concat(item)
      this.$store.dispatch('updateFPCategories', categories)
      this.$store.dispatch('chgLoading', 'false')
    },
    async MXtoEditFPCatGroup (item) {
      try {
        const updatedCatGroup = await this.$store.dispatch('DBeditFPCatGroup', {
          id: item.id,
          title: item.title,
          comment: item.comment,
          rating: item.rating,
          visible: item.visible
        })
        this.MXupdatedFPCatGroup(updatedCatGroup)
      } catch (e) {
        // console.log('error')
      }
    },
    MXupdatedFPCatGroup (updatedCatGroup) {
      const FPcatGroups = this.MXFPcatGroups().map(FPcatGroup => FPcatGroup.id ===
      updatedCatGroup.id ? updatedCatGroup : FPcatGroup)
      this.$store.dispatch('updateFPCatGroups', FPcatGroups)
    },
    async MXtoEditFPCategory (item) {
      try {
        const updatedCategory = await this.$store.dispatch('DBeditFPCategory', {
          id: item.id,
          title: item.title,
          parentId: item.parentId,
          comment: item.comment,
          expenses: item.expenses,
          entrances: item.entrances,
          catVisible: item.catVisible
        })
        this.MXupdatedFPCategory(updatedCategory)
      } catch (e) {
        // console.log('error')
      }
    },
    MXupdatedFPCategory (updatedCategory) {
      const FPCategories = this.MXFPcategories().map(FPcategory => FPcategory.id ===
      updatedCategory.id ? updatedCategory : FPcategory)
      this.$store.dispatch('updateFPCategories', FPCategories)
    },
    async MXtoRemoveFPCatGroup (id) {
      try {
        await this.$store.dispatch('DBremoveFPCatGroup', id)
        const FPcatGroups = this.MXFPcatGroups().filter(FPcatGroup => FPcatGroup.id !== id)
        this.$store.dispatch('updateFPCatGroups', FPcatGroups)
      } catch (e) {
        // console.log('error')
      }
    },
    async MXtoRemoveFPCategory (id) {
      try {
        await this.$store.dispatch('DBremoveFPCategory', id)
        const FPcategories = this.MXFPcategories().filter(FPcategory => FPcategory.id !== id)
        this.$store.dispatch('updateFPCategories', FPcategories)
      } catch (e) {
        // console.log('error')
      }
    }
  }
}
