<template>
  <div>
    <v-card
      class="my-0"
      :loading="loading"
      outlined
    >
    <div class="my-2 py-0 px-2">
      <v-row no-gutters style="flex-wrap: nowrap;">
        <v-col>
          <v-divider class="my-3"></v-divider>
        </v-col>
        <v-col
          cols="3"
          class="d-flex justify-center"
        >
          <div>
          <v-chip
            :disabled="disableFPTableMode === 'FPsections'"
            class="mx-2"
            small
            color="teal"
            :text-color= "FPsectionsAndGroupsTable === 'FPsections' ? 'white' : 'black'"
            :outlined= "FPsectionsAndGroupsTable !== 'FPsections'"
            @click="chgFPTableMode('FPsections')"
          >
            <h3>Разделы</h3>
          </v-chip>
          <v-chip
            :disabled="disableFPTableMode === 'FPgroups'"
            class="mx-2"
            small
            color="teal"
            :text-color= "FPsectionsAndGroupsTable === 'FPgroups' ? 'white' : 'black'"
            :outlined= "FPsectionsAndGroupsTable === 'FPgroups' ? false : true"
            @click="chgFPTableMode('FPgroups')"
          >
            <h3>Группы</h3>
          </v-chip>
          </div>
        </v-col>
        <v-col>
          <v-divider class="my-3"></v-divider>
        </v-col>
      </v-row>
    </div>
    </v-card>
    <v-window
      v-model="winMode"
      class="my-2"
      vertical
    >
      <v-window-item>
        <FPsectionsList/>
      </v-window-item>
      <v-window-item>
        GroupsTable
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import FPsectionsList from '@/components/FinPlan/SectAndGrp/FPsectionsList'
export default {
  name: 'FPSectAndGrpTables',
  components: {
    FPsectionsList
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    FPsectionsAndGroupsTable () {
      if (this.$store.getters.tableMode) {
        return this.$store.getters.tableMode
      } else {
        return 'FPsections'
      }
    },
    disableFPTableMode () {
      const itemMode = this.$store.getters.itemMode
      let disableTableMode = ''
      switch (itemMode) {
        case 'FPsectionCreate':
          disableTableMode = 'FPgroups'
          break
        case 'FPsectionEdit':
          disableTableMode = 'FPgroups'
          break
        case 'FPgroupCreate':
          disableTableMode = 'FPsections'
          break
        case 'FPgroupEdit':
          disableTableMode = 'FPsections'
          break
        default:
          disableTableMode = ''
      }
      return disableTableMode
    },
    winMode () {
      let winMode = 0
      switch (this.sectionsAndGroupsTable) {
        case 'FPsections':
          winMode = 0
          break
        case 'FPgroups':
          winMode = 1
          break
        default:
          winMode = 0
      }
      return winMode
    }
  },
  methods: {
    chgFPTableMode (tableMode) {
      this.$store.dispatch('chgFPTableMode', tableMode)
    }
  }
}
</script>

<style scoped>

</style>
