<template>
  <div>
    <v-card class="my-1 pa-1 mr-3">
      <div class="px-2 py-2 font-weight-black text-transform: uppercase text-center grey lighten-3">
        <h3>Группы категорий</h3>
      </div>
    <v-row no-gutters style="flex-wrap: nowrap;" class="my-2">
      <v-col
        class="flex-grow-0 flex-shrink-0"
      >
        <v-btn-toggle
          class="pr-2"
          v-model="LBsortButton"
        >
          <v-btn
            active-class="true"
          >
            <v-icon>mdi-sort-alphabetical-ascending</v-icon>
          </v-btn>
          <v-btn>
            <v-icon
            >mdi-star-outline</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col
        cols="1"
        style="min-width: 100px; max-width: 100%;"
        class="flex-grow-1 flex-shrink-0 pt-1"
      >
        <v-text-field
          v-model="LBsearchField"
          class=""
          label="Поиск"
          type: String
          dense
          outlined
          clearable
          hide-details
        >
        </v-text-field>
      </v-col>
    </v-row>
      <div v-if="LBFPcatGroups.length">
        <ul class="pl-0 pt-0 mt-1">
          <v-container
            id="scroll-target"
            style="max-height: 560px"
            class="pt-1 pl-0 overflow-y-auto"
          >
            <li
              class=""
              v-for="(LBFPcatGroup, i) in LBFPcatGroups"
              :key="i"
            >
              <v-card
                @click="chgStdFPCatGroup(LBFPcatGroup)"
                class="my-1"
                outlined
              >
                <v-card-actions class="ma-0 pa-1" >
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        class="pl-2"
                        v-bind="attrs"
                        v-on="on"
                      >mdi-information-outline</v-icon>
                    </template>
                    <span>
                    <div v-if="LBFPcatGroup.comment">{{LBFPcatGroup.comment}}</div>
                    <div v-else>Нет комментариев</div>
                  </span>
                  </v-tooltip>
                  <v-col cols="12" md="4" class="ma-0 pa-0">
                  <span
                    class="font-weight-black text-transform: uppercase pl-2"
                  >
                  {{LBFPcatGroup.title}}
                  </span>
                  </v-col>
                </v-card-actions>
              </v-card>
            </li>
            <v-row
              v-scroll:#scroll-target="onScroll"
              align="center"
              justify="center"
              style="height: 0px"
            >
            </v-row>
          </v-container>
        </ul>
      </div>
    </v-card>
  </div>
</template>

<script>
import FPcategories from '@/mixins/FinPlan/FPcategories.js'
export default {
  name: 'LBFPselCatGroup',
  mixins: [FPcategories],
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    LBsortButton: {
      get: function () {
        let LBsortButton = this.$store.getters.LBsortButton
        LBsortButton === 'rating' ? LBsortButton = 1 : LBsortButton = 0
        return LBsortButton
      },
      set: function (LBsortButton) {
        LBsortButton === 1 ? LBsortButton = 'rating' : LBsortButton = 'alphabet'
        this.$store.dispatch('chgLBsortButton', LBsortButton)
      }
    },
    LBsearchField: {
      get: function () {
        return this.$store.getters.LBsearchField
      },
      set: function (v) {
        let LBsearchField = ''
        v ? LBsearchField = v : LBsearchField = ''
        this.$store.dispatch('chgLBsearchField', LBsearchField)
      }
    },
    LBFPcatGroups () {
      return this.MXsortedRuEnLBFPcatGroups()
    }
  },
  methods: {
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    },
    chgStdFPCatGroup (id) {
      this.$store.dispatch('chgStdFPCatGroup', id)
    }
  }
}
</script>

<style scoped>

</style>
