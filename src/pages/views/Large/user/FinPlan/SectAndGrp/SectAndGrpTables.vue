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
            :disabled="disableTableMode === 'sections'"
            class="mx-2"
            small
            color="teal"
            :text-color= "sectionsAndGroupsTable === 'sections' ? 'white' : 'black'"
            :outlined= "sectionsAndGroupsTable !== 'sections'"
            @click="chgTableMode('sections')"
          >
            <h3>Разделы</h3>
          </v-chip>
          <v-chip
            :disabled="disableTableMode === 'groups'"
            class="mx-2"
            small
            color="teal"
            :text-color= "sectionsAndGroupsTable === 'groups' ? 'white' : 'black'"
            :outlined= "sectionsAndGroupsTable === 'groups' ? false : true"
            @click="chgTableMode('groups')"
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
        <sectionsList/>
      </v-window-item>
      <v-window-item>
        GroupsTable
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import sectionsList from '@/components/SectAndGrp/sectionsList'
export default {
  name: 'SectAndGrpTables',
  components: {
    sectionsList
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    sectionsAndGroupsTable () {
      return this.$store.getters.tableMode
    },
    disableTableMode () {
      const itemMode = this.$store.getters.itemMode
      let disableTableMode = ''
      switch (itemMode) {
        case 'sectionCreate':
          disableTableMode = 'groups'
          break
        case 'sectionEdit':
          disableTableMode = 'groups'
          break
        case 'groupCreate':
          disableTableMode = 'sections'
          break
        case 'groupEdit':
          disableTableMode = 'sections'
          break
        default:
          disableTableMode = ''
      }
      return disableTableMode
    },
    winMode () {
      let winMode = 0
      switch (this.sectionsAndGroupsTable) {
        case 'sections':
          winMode = 0
          break
        case 'groups':
          winMode = 1
          break
        default:
          winMode = 0
      }
      return winMode
    }
  },
  methods: {
    chgTableMode (tableMode) {
      this.$store.dispatch('chgTableMode', tableMode)
    }
  }
}
</script>

<style scoped>

</style>
