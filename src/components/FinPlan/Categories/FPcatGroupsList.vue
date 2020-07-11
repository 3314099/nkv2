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
              :color="!FPcatGroup.visible ? 'grey lighten-4' : ''"
            >
              <v-card-actions class="ma-0 pa-0" >
                <v-btn
                  v-if="FPcatGroup.visible"
                  class="ml-2"
                  @click="chgFPcatGroupVisible(FPcatGroup)"
                  icon>
                  <v-icon>mdi-eye-outline</v-icon>
                </v-btn>
                <v-btn
                  v-if="!FPcatGroup.visible"
                  class="ml-2"
                  @click="chgFPcatGroupVisible(FPcatGroup)"
                  icon>
                  <v-icon>mdi-eye-off-outline</v-icon>
                </v-btn>
                <v-tooltip left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      class="pl-2"
                      v-bind="attrs"
                      v-on="on"
                      :small="!FPcatGroup.visible"
                    >mdi-information-outline</v-icon>
                  </template>
                  <span>
                    <div v-if="FPcatGroup.comment">{{FPcatGroup.comment}}</div>
                    <div v-else>Нет комментариев</div>
                  </span>
                </v-tooltip>
                <v-col cols="12" md="4" class="ma-0 pa-0">
                  <span
                    :class="!FPcatGroup.visible ? 'font-weight-thin pl-2' : 'font-weight-black pl-2'"
                  >
                  {{FPcatGroup.title | toUpperCase}}
                  </span>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pa-0">
                  <span>
                     <v-rating
                       :class="FPcatGroup.visible ? 'pa-0' : 'ml-5'"
                       :value="FPcatGroup.rating"
                       :length="9"
                       hover
                       background-color="teal lighten-3"
                       color="teal"
                       :readonly="!FPcatGroup.visible"
                       :small="!FPcatGroup.visible"
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
    tableMode () {
      if (this.$store.getters.tableMode) {
        return this.$store.getters.tableMode
      } else {
        return ''
      }
    },
    FPcatGroups () {
      return this.tableMode === 'FPcatGroups' ? [...this.MXsortedRuEnFPcatGroups()] : []
    }
  },
  methods: {
    editFPCatGroup (FPcatGroup) {
      this.$store.dispatch('chgItemMode', 'FPcatGroup')
      this.$store.dispatch('chgEditItem', FPcatGroup)
      this.$store.dispatch('chgEditMode', 'edit')
      eventEmitter.$emit('toChgByEditItem')
    },
    chgRating (value, array) {
      const newArray = Object.assign({}, array)
      newArray.rating = value
      this.MXtoEditFPCatGroup(newArray)
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    },
    chgFPcatGroupVisible (catGroup) {
      const newCatGroup = Object.assign({}, catGroup)
      newCatGroup.visible = !catGroup.visible
      this.MXtoEditFPCatGroup(newCatGroup)
      this.$store.dispatch('updateFPCategories', this.$store.getters.FPcategories)
    }
  }
}
</script>

<style scoped>

</style>
