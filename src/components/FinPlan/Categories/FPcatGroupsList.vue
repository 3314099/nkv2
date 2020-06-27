<template>
  <div>
    <div v-if="!!loading && !FPcatGroups.length" class="text-center">
      <h1 class="font-weight-bold display-1 teal--text ">Список пуст</h1>
    </div>
    <div v-if="FPcatGroups.length">
      <ul class="pl-0 pt-0 mt-1">
        <v-container
          id="scroll-target"
          style="max-height: 560px"
          class="pt-1 pl-0 overflow-y-auto"
        >
          <li
            class=""
            v-for="(FPcatGroup, i) in FPcatGroups"
            :key="i"
          >
            <v-card
              class="my-1"
              outlined
            >
              <v-card-actions class="ma-0 pa-0" >
                <v-tooltip left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      class="pl-2"
                      v-bind="attrs"
                      v-on="on"
                    >mdi-information-outline</v-icon>
                  </template>
                  <span>
                    <div v-if="FPcatGroup.comment">{{FPcatGroup.comment}}</div>
                    <div v-else>Нет комментариев</div>
                  </span>
                </v-tooltip>
                <v-col cols="12" md="4" class="ma-0 pa-0">
                  <span
                    class="font-weight-black text-transform: uppercase pl-2"
                  >
                  {{FPcatGroup.title}}
                  </span>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pa-0">
                  <span>
                     <v-rating
                       class="pa-0"
                       :value="FPcatGroup.rating"
                       :length="9"
                       hover
                       background-color="teal lighten-3"
                       color="teal"
                       large
                       @input="chgRating($event, FPcatGroup)"
                     ></v-rating>
                  </span>
                </v-col>
                <v-spacer />
                <v-btn
                  class="mr-2"
                  @click="editFPCatGroup(FPcatGroup)"
                  icon>
                  <v-icon>mdi-lead-pencil</v-icon>
                </v-btn>
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
  </div>
</template>

<script>
import { eventEmitter } from '@/main'
import FPcategories from '@/mixins/FinPlan/FPcategories.js'
export default {
  name: 'FPcatGropsList',
  mixins: [FPcategories],
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    FPcatGroups () {
      return this.MXsortedRuEnFPCatGroups()
    }
  },
  methods: {
    editFPCatGroup (FPcatGroup) {
      this.$store.dispatch('chgItemMode', 'FPcatGroupEdit')
      this.$store.dispatch('chgEditItem', FPcatGroup)
      this.$store.dispatch('chgEditMode', 'edit')
      eventEmitter.$emit('toChgByEditItem')
    },
    chgRating (value, FPcatGroup) {
      FPcatGroup.rating = value
      this.MXtoEditFPCatGroup(FPcatGroup)
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    }
  }
}
</script>

<style scoped>

</style>
