import utils from '@/mixins/utils.js'
export default {
  mixins: [utils],
  methods: {
    MXFPtagGroups () {
      if (this.$store.getters.FPtagGroups) {
        return this.$store.getters.FPtagGroups.filter((item) => item.id)
      } else {
        return []
      }
    },
    MXFPtagGroupsSortedByVisibleButton () {
      return this.UsortByVisibleButton(this.MXFPtagGroups())
    },
    MXFPtagGroupsSortedBySortButton () {
      return this.MXFPtagGroupsSortedByVisibleButton() ? this.UsortBySortButton(
        this.MXFPtagGroupsSortedByVisibleButton(), this.$store.getters.sortButton) : []
    },
    MXsortedRuEnFPtagGroups () {
      return this.UsortRuEnArray(this.MXFPtagGroupsSortedBySortButton(), this.UsearchField())
    },
    MXLBFPtagGroups () {
      return this.MXFPtagGroups()
    },
    MXLBFPtagGroupsSortedBySortButton () {
      return this.MXLBFPtagGroups() ? this.UsortBySortButton(
        this.MXLBFPtagGroups(), this.$store.getters.LBsortButton) : []
    },
    MXsortedRuEnLBFPtagGroups () {
      return this.UsortRuEnArray(
        this.MXLBFPtagGroupsSortedBySortButton(), this.ULBsearchField())
    },
    MXFPtags () {
      return this.$store.getters.FPtags
    },
    MXFPtagsSortedByVisibleButton () {
      return this.UsortByVisibleButton(this.MXFPtags())
    },
    MXFPtagsSortedBySortButton () {
      return this.MXFPtagsSortedByVisibleButton() ? this.UsortBySortButton(
        this.MXFPtagsSortedByVisibleButton(), this.$store.getters.sortButton) : []
    },
    MXsortedRuEnFPtags () {
      return this.UsortRuEnArray(this.MXFPtags(), this.UsearchField())
    },
    async MXtoCreateFPTagGroup (item) {
      try {
        const createdItem = await this.$store.dispatch('DBcreateFPTagGroup', {
          title: item.title,
          comment: item.comment,
          rating: item.rating,
          visible: item.visible
        })
        this.MXcreatedFPTagGroup(createdItem)
      } catch (e) {
        // console.log('error')
      }
    },
    MXcreatedFPTagGroup (item) {
      const FPtagGroups = this.MXFPtagGroups().concat(item)
      this.$store.dispatch('updateFPTagGroups', FPtagGroups)
      this.$store.dispatch('chgLoading', 'false')
    },
    async MXtoCreateFPTag (item) {
      try {
        const createdItem = await this.$store.dispatch('DBcreateFPTag', {
          title: item.title,
          parentId: item.parentId,
          comment: item.comment
        })
        this.MXcreatedFPTag(createdItem)
      } catch (e) {
        // console.log('error')
      }
    },
    MXcreatedFPTag (item) {
      const tags = this.MXFPtags().concat(item)
      this.$store.dispatch('updateFPTags', tags)
      this.$store.dispatch('chgLoading', 'false')
    },
    async MXtoEditFPtagGroup (item) {
      try {
        const updatedCatGroup = await this.$store.dispatch('DBeditFPTagGroup', {
          id: item.id,
          title: item.title,
          comment: item.comment,
          rating: item.rating,
          visible: item.visible
        })
        this.MXupdatedFPTagGroup(updatedCatGroup)
      } catch (e) {
        // console.log('error')
      }
    },
    MXupdatedFPTagGroup (updatedTagGroup) {
      const array = this.MXFPtagGroups().map(item => item.id ===
      updatedTagGroup.id ? updatedTagGroup : item)
      this.$store.dispatch('updateFPTagGroups', array)
    },
    async MXtoEditFPTag (item) {
      try {
        const updatedTag = await this.$store.dispatch('DBeditFPTag', {
          id: item.id,
          title: item.title,
          parentId: item.parentId,
          comment: item.comment,
          expenses: item.expenses,
          entrances: item.entrances,
          catVisible: item.catVisible
        })
        this.MXupdatedFPTag(updatedTag)
      } catch (e) {
        // console.log('error')
      }
    },
    MXupdatedFPTag (updatedTag) {
      const array = this.MXFPtags().map(item => item.id ===
      updatedTag.id ? updatedTag : item)
      this.$store.dispatch('updateFPTags', array)
    },
    async MXtoRemoveFPTagGroup (id) {
      try {
        await this.$store.dispatch('DBremoveFPTagGroup', id)
        const FPtagGroups = this.MXFPtagGroups().filter(FPtagGroup => FPtagGroup.id !== id)
        this.$store.dispatch('updateFPTagGroups', FPtagGroups)
        this.MXtoRemoveFPTagsWithoutGroup(id)
      } catch (e) {
        // console.log('error')
      }
    },
    MXtoRemoveFPTagsWithoutGroup (id) {
      // const array = this.MXFPtags().filter(item => item.parentId === id)
    },
    async MXtoRemoveFPTag (id) {
      try {
        await this.$store.dispatch('DBremoveFPTag', id)
        const array = this.MXFPtags().filter(item => item.id !== id)
        this.$store.dispatch('updateFPTags', array)
      } catch (e) {
        // console.log('error')
      }
    }
  }
}
