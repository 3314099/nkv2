<template>
  <div>
    <v-card class="my-1 pa-1 mr-3">
      <div class="px-2 py-2 font-weight-black text-transform: uppercase text-center grey lighten-3">
        <h3>Группы тэгов</h3>
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
      <div v-if="LBFPtagGroups.length">
        <ul class="pl-0 pt-0 mt-1">
          <v-container
            id="scroll-target"
            style="max-height: 560px"
            class="pt-1 px-0 overflow-y-auto"
          >
            <li
              class=""
              v-for="(LBFPtagGroup, i) in LBFPtagGroupsList"
              :key="i"
            >
              <div class="d-flex flex-nowrap">
                <div class="flex-grow-1">
              <v-card
                class="my-1"
                outlined
                :color="!LBFPtagGroup.visible ? 'grey lighten-4' : ''"
                @click="chgStdFPTagGroup(LBFPtagGroup)"
              >
                <v-card-actions
                  class="ma-0 pa-1"
                >
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        class="pl-2"
                        v-bind="attrs"
                        v-on="on"
                      >mdi-information-outline</v-icon>
                    </template>
                    <span>
                    <div v-if="LBFPtagGroup.comment">{{LBFPtagGroup.comment}}</div>
                    <div v-else>Нет комментариев</div>
                  </span>
                  </v-tooltip>
                  <span
                    class="font-weight-black text-transform: uppercase pl-2"
                    style="cursor:pointer"
                  >
                  {{LBFPtagGroup.title | toUpperCase}}
                  </span>
                  <v-spacer />
                  <v-badge
                    :class="LBFPtagGroup.tags.length ? 'px-3' : 'px-1'"
                    bordered
                    inline
                    :color="LBFPtagGroup.tags.length ? 'teal': 'deep-orange'"
                    :content="LBFPtagGroup.tags.length ? LBFPtagGroup.tags.length : '0'"
                  >
                  </v-badge>

                    <v-icon v-if="LBFPtagGroup.visible && LBFPtagGroup.tags.length">mdi-eye-outline</v-icon>
                    <v-icon v-if="!LBFPtagGroup.visible && LBFPtagGroup.tags.length">mdi-eye-off-outline</v-icon>
                </v-card-actions>
              </v-card>
                </div>
                <div
                  v-if="!LBFPtagGroup.tags.length"
                  class="ma-0 py-2 pl-1 pr-1">
              <v-icon
                @click="toRemoveTagGroup(LBFPtagGroup.id)"
              >
                mdi-trash-can-outline
              </v-icon>
                </div>
              </div>
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
import { eventEmitter } from '@/main'
import FPtags from '@/mixins/FinPlan/FPtags.js'
export default {
  name: 'LBFPselTagGroup',
  mixins: [FPtags],
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    LBsortButton: {
      get: function () {
        let sortButton = this.$store.getters.LBsortButton
        sortButton === 'rating' ? sortButton = 1 : sortButton = 0
        return sortButton
      },
      set: function (sortButton) {
        sortButton === 1 ? sortButton = 'rating' : sortButton = 'alphabet'
        this.$store.dispatch('chgLBsortButton', sortButton)
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
    LBFPtagGroupsList () {
      const newFPtagGroups = this.MXsortedRuEnLBFPtagGroups()
      const tags = [...this.MXFPtags()]
      newFPtagGroups.forEach((FPtagGroup) => {
        FPtagGroup.type = 'FPtagGroup'
        const newTags = tags.filter(tag => FPtagGroup.id === tag.parentId)
        newTags.forEach((tag) => {
          tag.visible = FPtagGroup.visible
        })
        FPtagGroup.tags = newTags
        return FPtagGroup
      })
      return newFPtagGroups
    },
    LBFPtagGroups () {
      return this.MXsortedRuEnLBFPtagGroups()
    }
  },
  methods: {
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    },
    chgStdFPTagGroup (id) {
      this.$store.dispatch('chgStdFPTagGroup', id)
      eventEmitter.$emit('changedStdFPTagGroup')
    },
    toRemoveTagGroup (id) {
      this.$store.dispatch('chgStdFPTagGroup', {})
      this.$store.dispatch('chgLoading', 'true')
      this.MXtoRemoveFPTagGroup(id)
    }
  }
}
</script>

<style scoped>

</style>
