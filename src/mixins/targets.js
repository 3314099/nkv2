import utils from '@/mixins/utils.js'
export default {
  mixins: [utils],
  methods: {
    MXtargets () {
      return this.$store.getters.targets
    },
    MXsectionTargets () {
      return this.filterByType(this.MXtargets(), 'type', 'section')
    },
    MXcolorsIgnoreArray () {
      return this.arrayFromObjectsArrayByField(this.MXsectionTargets(), 'color')
    },
    async MXtoCreate (item) {
      try {
        const createdItem = await this.$store.dispatch('createTarget', {
          title: item.title,
          comment: item.comment,
          type: item.type,
          color: item.color,
          sectionId: item.sectionId,
          groupId: item.groupId,
          expenses: item.expenses,
          entrances: item.entrances
        })
        this.MXcreatedTarget(createdItem)
      } catch (e) {
        // console.log('error')
      }
    },
    MXcreatedTarget (item) {
      const targets = this.MXtargets().concat(item)
      this.$store.dispatch('updateTargets', targets)
    },
    async MXtoEdit (item) {
      try {
        const updatedTarget = await this.$store.dispatch('editTarget', {
          id: item.id,
          title: item.title,
          comment: item.comment,
          type: item.type,
          color: item.color,
          sectionId: item.sectionId,
          groupId: item.groupId,
          expenses: item.expenses,
          entrances: item.entrances
        })
        this.MXupdatedTarget(updatedTarget)
      } catch (e) {
        // console.log('error')
      }
    },
    MXupdatedTarget (updatedTarget) {
      const targets = this.MXtargets().map(target => target.id ===
      updatedTarget.id ? updatedTarget : target)
      this.$store.dispatch('updateTargets', targets)
    },
    async MXtoRemove (id) {
      try {
        await this.$store.dispatch('removeTarget', id)
        const newArray = this.MXtargets().filter(target => target.id !== id)
        this.$store.dispatch('updateTargets', newArray)
      } catch (e) {
        // console.log('error')
      }
    }
  }
}
