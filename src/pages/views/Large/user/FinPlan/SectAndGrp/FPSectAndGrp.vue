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
        :value="'FPsecGroupCreate'"
      >
        <FPsecGroupEdit/>
      </v-tab-item>
      <v-tab-item
        :value="'FPsectionEdit'"
      >
        <FPsectionEdit/>
      </v-tab-item>
      <v-tab-item
        :value="'FPsecGroupEdit'"
      >
        <FPsecGroupEdit/>
      </v-tab-item>
    </v-tabs-items>
    <FPSectAndGrpTables/>
  </div>
</template>

<script>
import FPsectAndGrpDefault from '@/components/FinPlan/SectAndGrp/FPsectAndGrpDefault'
import FPsectionEdit from '@/components/FinPlan/SectAndGrp/FPsectionEdit'
import FPsecGroupEdit from '@/components/FinPlan/SectAndGrp/FPsecGroupEdit'
import FPSectAndGrpTables from '@/pages/views/Large/user/FinPlan/SectAndGrp/FPSectAndGrpTables'
export default {
  name: 'SectAndGrp',
  components: {
    FPsectAndGrpDefault,
    FPsectionEdit,
    FPsecGroupEdit,
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
          case 'FPsecGroupCreate':
            sectionsAndGroupsMode = 'FPsecGroupCreate'
            this.$store.dispatch('chgTableMode', 'FPsecGroups')
            break
          case 'FPsectionEdit':
            sectionsAndGroupsMode = 'FPsectionEdit'
            this.$store.dispatch('chgTableMode', 'FPsections')
            break
          case 'FPsecGroupEdit':
            sectionsAndGroupsMode = 'FPsecGroupEdit'
            this.$store.dispatch('chgTableMode', 'FPsecGroups')
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
