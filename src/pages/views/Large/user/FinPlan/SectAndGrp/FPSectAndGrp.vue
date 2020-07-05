<template>
  <div class="ma-4">
    <v-tabs-items v-model="FPsectionsAndGroupsMode">
      <v-tab-item
      :value="'FPsectAndGrpDefault'"
      >
        <FPsectAndGrpDefault/>
      </v-tab-item>
      <v-tab-item
        :value="'FPsection'"
      >
        <FPsectionEdit/>
      </v-tab-item>
      <v-tab-item
        :value="'FPsecGroup'"
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
    itemMode: {
      get: function () {
        return this.$store.getters.itemMode
      }
    },
    FPsectionsAndGroupsMode: {
      get: function () {
        let sectionsAndGroupsMode = ''
        switch (this.$store.getters.itemMode) {
          case 'FPsection':
            sectionsAndGroupsMode = 'FPsection'
            this.$store.dispatch('chgTableMode', 'FPsections')
            break
          case 'FPsecGroup':
            sectionsAndGroupsMode = 'FPsecGroup'
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
