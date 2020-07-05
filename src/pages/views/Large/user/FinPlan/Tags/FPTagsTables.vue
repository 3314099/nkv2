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
          <v-btn active-class="true">
            <v-icon
            >mdi-sort-alphabetical-variant</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-folder-star-outline</v-icon>
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
                cols="1"
                class="d-flex justify-center"
              >
                <div>
                  <v-chip
                    class="mx-2"
                    small
                    color="teal"
                    text-color="white"
                  >
                    <h3>Тэги</h3>
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
        <FPtagsList/>
  </div>
</template>

<script>
import FPtagsList from '@/components/FinPlan/Tags/FPtagsList'
export default {
  name: 'FPTagsTables',
  components: {
    FPtagsList
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
          default: // parentAlphabet
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
          default: // 0
            sortButton = 'alphabet'
            break
        }
        this.$store.dispatch('chgSortButton', sortButton)
      }
    },
    visibleBtn () {
      return this.$store.getters.visibleButton
    },
    itemMode: {
      get: function () {
        return this.$store.getters.itemMode
      }
    },
    disableFPTableMode () {
      const itemMode = this.$store.getters.itemMode
      let disableTableMode = ''
      switch (itemMode) {
        case 'FPcatGroupCreate':
          disableTableMode = 'FPcategories'
          break
        case 'FPcatGroupEdit':
          disableTableMode = 'FPcategories'
          break
        case 'FPcategoryCreate':
          disableTableMode = 'FPcatGroups'
          break
        case 'FPcategoryEdit':
          disableTableMode = 'FPcatGroups'
          break
        default:
          disableTableMode = ''
      }
      return disableTableMode
    }
  },
  methods: {
    chgTableMode (tableMode) {
      this.$store.dispatch('chgTableMode', tableMode)
    },
    chgVisibleBtn () {
      this.$store.dispatch('chgVisibleButton')
    }
  }
}
</script>

<style scoped>

</style>
