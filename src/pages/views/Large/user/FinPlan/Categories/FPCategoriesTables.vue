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
          class="pr-2"
          v-model="sortButton"
          mandatory
        >
          <v-btn
            active-class="true"
            @click="chgSortBtn('alphabet')"
          >
            <v-icon>mdi-sort-alphabetical-ascending</v-icon>
          </v-btn>
          <template
            v-if="FPcategoriesTable === 'FPcatGroups'"
          >
            <v-btn
              @click="chgSortBtn('rating')"
            >
              <v-icon>mdi-star-outline</v-icon>
            </v-btn>
          </template>
          <template
            v-else
          >
            <v-btn
              @click="chgSortBtn('parentRating')"
            >
              <v-icon>mdi-folder-star-outline</v-icon>
            </v-btn>
            <v-btn
              @click="chgSortBtn('parentAlphabet')"
            >
              <v-icon>mdi-sort-alphabetical-variant</v-icon>
            </v-btn>
          </template>
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
                cols="4"
                class="d-flex justify-center"
              >
                <div>
                  <v-chip
                    :disabled="disableFPTableMode === 'FPcatGroups'"
                    class="mx-2"
                    small
                    color="teal"
                    :text-color= "FPcategoriesTable === 'FPcatGroups' ? 'white' : 'black'"
                    :outlined= "FPcategoriesTable !== 'FPcatGroups'"
                    @click="chgTableMode('FPcatGroups')"
                  >
                    <h3>???????????? ??????????????????</h3>
                  </v-chip>
                  <v-chip
                    :disabled="disableFPTableMode === 'FPcategories'"
                    class="mx-2"
                    small
                    color="teal"
                    :text-color= "FPcategoriesTable === 'FPcategories' ? 'white' : 'black'"
                    :outlined= "FPcategoriesTable === 'FPcategories' ? false : true"
                    @click="chgTableMode('FPcategories')"
                  >
                    <h3>??????????????????</h3>
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
        <FPcatGroupsList/>
      </v-window-item>
      <v-window-item>
        <FPcategoriesList/>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import FPcatGroupsList from '@/components/FinPlan/Categories/FPcatGroupsList'
import FPcategoriesList from '@/components/FinPlan/Categories/FPcategoriesList'
export default {
  name: 'FPCategoriesTables',
  components: {
    FPcatGroupsList,
    FPcategoriesList
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
      set: function (v) {
      }
    },
    visibleBtn () {
      return this.$store.getters.visibleButton
    },
    FPcategoriesTable () {
      if (this.$store.getters.tableMode) {
        return this.$store.getters.tableMode
      } else {
        return 'FPcategories'
      }
    },
    itemMode: {
      get: function () {
        return this.$store.getters.itemMode
      }
    },
    disableFPTableMode () {
      const itemMode = this.$store.getters.editMode
      let disableTableMode = ''
      if (itemMode === 'create' || itemMode === 'edit') {
        switch (this.$store.getters.itemMode) {
          case 'FPcatGroup':
            disableTableMode = 'FPcategories'
            break
          case 'FPcategory':
            disableTableMode = 'FPcatGroups'
            break
          default:
            disableTableMode = ''
        }
      }
      return disableTableMode
    },
    winMode () {
      let winMode = 0
      switch (this.FPcategoriesTable) {
        case 'FPcatGroups':
          winMode = 0
          break
        case 'FPcategories':
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
      this.$store.dispatch('chgSortButton', 'alphabet')
      this.$store.dispatch('chgTableMode', tableMode)
    },
    chgVisibleBtn () {
      this.$store.dispatch('chgVisibleButton')
    },
    chgSortBtn (val) {
      this.$store.dispatch('chgSortButton', val)
    }
  }
}
</script>

<style scoped>

</style>
