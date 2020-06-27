import utils from '@/mixins/utils.js'
export default {
  mixins: [utils],
  methods: {
    MXFPcatGroups () {
      const FPcatGroups = this.$store.getters.FPcatGroups
      let field = 'title'
      let reverse = false
      if (this.sortButton() === 'rating') {
        field = 'rating'
        reverse = true
      } else {
        field = 'title'
        reverse = false
      }
      if (FPcatGroups) {
        return this.UsortObjectsArray(FPcatGroups, field, reverse)
      } else {
        return []
      }
    },
    MXFPcategories () {
      const FPcategories = this.$store.getters.FPcategories
      const FPcatGroups = this.$store.getters.FPcatGroups
      if (FPcategories) {
        for (let i = 0; i < FPcategories.length; i++) {
          const catGroup = FPcatGroups
            .find(FPcatGroup => FPcatGroup.id === FPcategories[i].FPcatGroupId)
          if (catGroup) {
            FPcategories[i].FPcatGroupId = catGroup.id
            FPcategories[i].FPcatGroupTitle = catGroup.title
            FPcategories[i].FPcatGroupRating = catGroup.rating
            FPcategories[i].FPcatGroupComment = catGroup.comment
          } else {
            FPcategories[i].FPcatGroupId = ''
            FPcategories[i].FPcatGroupTitle = 'Без группы'
            FPcategories[i].FPcatGroupRating = 1
            FPcategories[i].FPcatGroupComment = ''
          }
          FPcategories[i].type = 'FPCategory'
        } return FPcategories
      } else {
        return []
      }
    },
    MXFPCategoriesSortedBySortButton () {
      const RBtn = this.$store.getters.RBtn
      if (this.MXFPcategories()) {
        let MXFPCategoriesSortedBySortButton = this.MXFPcategories()
        switch (RBtn) {
          case 'visible':
            MXFPCategoriesSortedBySortButton =
              this.UfilterByType(MXFPCategoriesSortedBySortButton, 'visible', true)
            break
          case 'unvisible':
            MXFPCategoriesSortedBySortButton =
              this.UfilterByType(MXFPCategoriesSortedBySortButton, 'visible', false)
            break
        }
        MXFPCategoriesSortedBySortButton =
        this.UsortObjectsArray(MXFPCategoriesSortedBySortButton, 'title', false)
        if (this.sortButton() === 'parentAlphabet') {
          MXFPCategoriesSortedBySortButton =
            this.UsortObjectsArray(MXFPCategoriesSortedBySortButton.reverse(), 'FPcatGroupTitle', false)
        }
        if (this.sortButton() === 'rating') {
          MXFPCategoriesSortedBySortButton =
          this.UsortObjectsArray(MXFPCategoriesSortedBySortButton, 'FPcatGroupRating', true)
        }
        return MXFPCategoriesSortedBySortButton
      } else {
        return []
      }
    },
    MXLBFPcatGroups () {
      const FPcatGroups = this.$store.getters.FPcatGroups
      let field = 'title'
      let reverse = false
      if (this.LBSortButton() === 'rating') {
        field = 'rating'
        reverse = true
      } else {
        field = 'title'
        reverse = false
      }
      return this.UsortObjectsArray(FPcatGroups, field, reverse)
    },
    MXsortedRuEnFPCatGroups () {
      return this.UsortRuEnArray(this.MXFPcatGroups(), this.UsearchField())
    },
    MXsortedRuEnFPCategories () {
      return this.UsortRuEnArray(this.MXFPCategoriesSortedBySortButton(), this.UsearchField())
    },
    MXsortedRuEnLBFPcatGroups () {
      return this.UsortRuEnArray(this.MXLBFPcatGroups(), this.ULBsearchField())
    },
    async MXtoCreateFPCatGroup (item) {
      try {
        const createdItem = await this.$store.dispatch('DBcreateFPCatGroup', {
          title: item.title,
          comment: item.comment,
          rating: item.rating
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
          FPcatGroupId: item.FPcatGroupId,
          FPcatGroupTitle: item.FPcatGroupTitle,
          comment: item.comment,
          expenses: item.expenses,
          entrances: item.entrances,
          visible: item.visible
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
          rating: item.rating
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
          FPcatGroupId: item.FPcatGroupId,
          FPcatGroupTitle: item.FPcatGroupTitle,
          comment: item.comment,
          expenses: item.expenses,
          entrances: item.entrances,
          visible: item.visible
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
