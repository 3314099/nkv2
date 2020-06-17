<template>
  <div class="ma-4">
    <v-tabs-items v-model="sectionsAndGroupsMode">
      <v-tab-item
      :value="'sectAndGrpDefault'"
      >
        <sectAndGrpDefault/>
      </v-tab-item>
      <v-tab-item
        :value="'sectionCreate'"
      >
        <sectionEdit/>
      </v-tab-item>
      <v-tab-item
        :value="'groupCreate'"
      >
        <groupEdit/>
      </v-tab-item>
      <v-tab-item
        :value="'sectionEdit'"
      >
        <sectionEdit/>
      </v-tab-item>
      <v-tab-item
        :value="'groupEdit'"
      >
        <groupEdit/>
      </v-tab-item>
    </v-tabs-items>
    <SectAndGrpTables/>
  </div>
</template>

<script>
import sectAndGrpDefault from '@/components/SectAndGrp/sectAndGrpDefault'
import sectionEdit from '@/components/SectAndGrp/sectionEdit'
import groupEdit from '@/components/SectAndGrp/groupEdit'
import SectAndGrpTables from '@/pages/views/Large/user/FinPlan/SectAndGrp/SectAndGrpTables'
export default {
  name: 'SectAndGrp',
  components: {
    sectAndGrpDefault,
    sectionEdit,
    groupEdit,
    SectAndGrpTables
  },
  computed: {
    itemMode () {
      return this.$store.getters.itemMode
    },
    sectionsAndGroupsMode: {
      get: function () {
        const itemMode = this.$store.getters.itemMode
        let sectionsAndGroupsMode = ''
        switch (itemMode) {
          case 'sectionCreate':
            sectionsAndGroupsMode = 'sectionCreate'
            this.$store.dispatch('chgTableMode', 'sections')
            break
          case 'groupCreate':
            sectionsAndGroupsMode = 'groupCreate'
            this.$store.dispatch('chgTableMode', 'groups')
            break
          case 'sectionEdit':
            sectionsAndGroupsMode = 'sectionEdit'
            break
          case 'groupEdit':
            sectionsAndGroupsMode = 'groupEdit'
            break
          default:
            sectionsAndGroupsMode = 'sectAndGrpDefault'
        }
        return sectionsAndGroupsMode
      },
      set: function (v) {
      }
    }
  }
}
</script>

<style scoped>

</style>
