<template>
  <div>
    <v-row no-gutters style="flex-wrap: nowrap;">
      <v-col
        class="flex-grow-0 flex-shrink-0"
      >
        <v-btn-toggle
          class="pr-2"
          active-class="false"
          mandatory
        >
          <v-btn
            v-if="visibleBtn === 'all'"
            @click="chgVisibleBtn()"
          >
            <v-icon>mdi-eye-outline</v-icon>
          </v-btn>
          <v-btn
            v-if="visibleBtn === 'visible'"
            @click="chgVisibleBtn()"
          >
            <v-icon>mdi-eye-plus-outline</v-icon>
          </v-btn>
          <v-btn
            v-if="visibleBtn === 'unvisible'"
            @click="chgVisibleBtn()"
          >
            <v-icon>mdi-eye-minus-outline</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col
        class="flex-grow-0 flex-shrink-0"
      >
        <v-btn-toggle
          v-if="FPsectionsAndGroupsTable === 'FPsecGroups'"
          class="pr-2"
          v-model="sortButton"
          mandatory
        >
          <v-btn
            active-class="true"
          >
            <v-icon>mdi-sort-alphabetical-ascending</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-star-outline</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col
        cols="1"
        style="min-width: 100px; max-width: 100%;"
        class="flex-grow-1 flex-shrink-0"
      >
        <v-card
          class="my-0"
          :loading="loading"
          outlined
          height="48px"
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
                    :disabled="disableFPTableMode === 'FPsecGroups'"
                    class="mx-2"
                    small
                    color="teal"
                    :text-color= "FPsectionsAndGroupsTable === 'FPsecGroups' ? 'white' : 'black'"
                    :outlined= "FPsectionsAndGroupsTable === 'FPsecGroups' ? false : true"
                    @click="chgFPTableMode('FPsecGroups')"
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
      </v-col>
    </v-row>
    <v-window
      v-model="winMode"
      class="my-2"
      vertical
    >
      <v-window-item>
        <FPsectionsList/>
      </v-window-item>
      <v-window-item>
        <FPsecGroupsList/>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import FPsectionsList from '@/components/FinPlan/SectAndGrp/FPsectionsList'
import FPsecGroupsList from '@/components/FinPlan/SectAndGrp/FPsecGroupsList'
export default {
  name: 'FPSectAndGrpTables',
  components: {
    FPsectionsList,
    FPsecGroupsList
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    sortButton: {
      get: function () {
        let sortButton = this.$store.getters.sortButton
        switch (sortButton) {
          case 'rating':
            sortButton = 1
            break
          case 'parentAlphabet':
            sortButton = 2
            break
          default: // alphabet
            sortButton = 0
            break
        }
        return sortButton
      },
      set: function (sortButton) {
        switch (sortButton) {
          case 1:
            sortButton = 'rating'
            break
          case 2:
            sortButton = 'parentAlphabet'
            break
          default: // 0
            sortButton = 'alphabet'
            break
        }
        this.$store.dispatch('chgSortButton', sortButton)
      }
    },
    visibleBtn () {
      return this.$store.getters.RBtn
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
          disableTableMode = 'FPsecGroups'
          break
        case 'FPsectionEdit':
          disableTableMode = 'FPsecGroups'
          break
        case 'FPsecGroupCreate':
          disableTableMode = 'FPsections'
          break
        case 'FPsecGroupEdit':
          disableTableMode = 'FPsections'
          break
        default:
          disableTableMode = ''
      }
      return disableTableMode
    },
    winMode () {
      let winMode = 0
      switch (this.FPsectionsAndGroupsTable) {
        case 'FPsections':
          winMode = 0
          break
        case 'FPsecGroups':
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
      this.$store.dispatch('chgTableMode', tableMode)
    },
    chgVisibleBtn () {
      let visibleBtn = 'all'
      switch (this.visibleBtn) {
        case 'all':
          visibleBtn = 'visible'
          break
        case 'visible':
          visibleBtn = 'unvisible'
          break
        case 'unvisible':
          visibleBtn = 'all'
          break
      }
      this.$store.dispatch('chgRBtn', visibleBtn)
    }
  }
}
</script>

<style scoped>

</style>
