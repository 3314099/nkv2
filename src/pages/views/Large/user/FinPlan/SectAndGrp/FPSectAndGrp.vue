<template>
  <div class="ma-4">
    <v-tabs-items v-model="FPsectionsAndGroupsMode">
      <v-tab-item
      :value="'FPsectAndGrpDefault'"
      >
        <FPsectAndGrpDefault/>
      </v-tab-item>
      <v-tab-item
        :value="'FPsectionCreate'"
      >
        <FPsectionEdit/>
      </v-tab-item>
      <v-tab-item
        :value="'FPgroupCreate'"
      >
        <FPgroupEdit/>
      </v-tab-item>
      <v-tab-item
        :value="'FPsectionEdit'"
      >
        <FPsectionEdit/>
      </v-tab-item>
      <v-tab-item
        :value="'FPgroupEdit'"
      >
        <FPgroupEdit/>
      </v-tab-item>
    </v-tabs-items>
    <FPSectAndGrpTables/>
  </div>
</template>

<script>
import FPsectAndGrpDefault from '@/components/FinPlan/SectAndGrp/FPsectAndGrpDefault'
import FPsectionEdit from '@/components/FinPlan/SectAndGrp/FPsectionEdit'
import FPgroupEdit from '@/components/FinPlan/SectAndGrp/FPgroupEdit'
import FPSectAndGrpTables from '@/pages/views/Large/user/FinPlan/SectAndGrp/FPSectAndGrpTables'
export default {
  name: 'SectAndGrp',
  components: {
    FPsectAndGrpDefault,
    FPsectionEdit,
    FPgroupEdit,
    FPSectAndGrpTables
  },
  computed: {
    itemMode () {
      return this.$store.getters.itemMode
    },
    FPsectionsAndGroupsMode: {
      get: function () {
        const itemMode = this.$store.getters.itemMode
        let sectionsAndGroupsMode = ''
        switch (itemMode) {
          case 'FPsectionCreate':
            sectionsAndGroupsMode = 'FPsectionCreate'
            this.$store.dispatch('chgTableMode', 'FPsections')
            break
          case 'FPgroupCreate':
            sectionsAndGroupsMode = 'FPgroupCreate'
            this.$store.dispatch('chgTableMode', 'FPgroups')
            break
          case 'FPsectionEdit':
            sectionsAndGroupsMode = 'FPsectionEdit'
            break
          case 'groupEdit':
            sectionsAndGroupsMode = 'FPgroupEdit'
            break
          default:
            sectionsAndGroupsMode = 'FPsectAndGrpDefault'
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
