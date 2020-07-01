<template>
  <div>
    <div v-if="!!loading && !FPsecGroups.length" class="text-center">
      <h1 class="font-weight-bold display-1 teal--text ">Список пуст</h1>
    </div>
    <div v-if="FPsecGroups.length">
      <ul class="pl-0 pt-0 mt-1">
        <v-container
          id="scroll-target"
          style="max-height: 560px"
          class="pt-1 pl-0 overflow-y-auto"
        >
          <li
            class=""
            v-for="(FPsecGroup, i) in FPsecGroups"
            :key="i"
          >
            <v-card
              class="my-1"
              outlined
              :color="!FPsecGroup.visible ? 'grey lighten-4 py-0' : ''"
            >
              <v-card-actions class="ma-0 pa-0" >
                <v-btn
                  v-if="FPsecGroup.visible"
                  class="ml-2"
                  @click="chgFPSecGroupVisible(FPsecGroup)"
                  icon>
                  <v-icon>mdi-eye-outline</v-icon>
                </v-btn>
                <v-btn
                  v-if="!FPsecGroup.visible"
                  class="ml-2"
                  @click="chgFPSecGroupVisible(FPsecGroup)"
                  icon>
                  <v-icon>mdi-eye-off-outline</v-icon>
                </v-btn>
                <v-tooltip left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      :small="!FPsecGroup.visible"
                      :class="!FPsecGroup.visible ? 'pl-5' : 'pl-2'"
                      v-bind="attrs"
                      v-on="on"
                    >mdi-information-outline</v-icon>
                  </template>
                  <span>
                    <div v-if="FPsecGroup.comment">{{FPsecGroup.comment}}</div>
                    <div v-else>Нет комментариев</div>
                  </span>
                </v-tooltip>
                <v-col cols="12" md="4" class="ma-0 pa-0">
                  <span
                    :class="!FPsecGroup.visible ? 'font-weight-thin pl-2' : 'font-weight-black pl-2'"
                  >
                  {{FPsecGroup.title | toUpperCase}}
                  </span>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pa-0">
                  <span>
                     <v-rating
                       :class="!FPsecGroup.visible ? 'ml-5 pa-0' : 'pa-0'"
                       :small="!FPsecGroup.visible"
                       :value="FPsecGroup.rating"
                       :length="9"
                       hover
                       background-color="teal lighten-3"
                       color="teal"
                       large
                       @input="chgRating($event, FPsecGroup)"
                     ></v-rating>
                  </span>
                </v-col>
                <v-spacer />
                <v-btn
                  class="mr-2"
                  @click="editFPsecGroup(FPsecGroup)"
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
import FPsections from '@/mixins/FinPlan/FPsections.js'
export default {
  name: 'FPsecGropsList',
  mixins: [FPsections],
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    FPsecGroups () {
      return this.MXsortedRuEnFPsecGroups()
    }
  },
  methods: {
    editFPsecGroup (FPsecGroup) {
      this.$store.dispatch('chgItemMode', 'FPsecGroupEdit')
      this.$store.dispatch('chgEditItem', FPsecGroup)
      this.$store.dispatch('chgEditMode', 'edit')
      eventEmitter.$emit('toChgByEditItem')
    },
    chgRating (value, secGroup) {
      const newSecGroup = Object.assign({}, secGroup)
      newSecGroup.rating = value
      this.MXtoEditFPsecGroup(newSecGroup)
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    },
    chgFPSecGroupVisible (secGroup) {
      const newSecGroup = Object.assign({}, secGroup)
      newSecGroup.visible = !secGroup.visible
      this.MXtoEditFPsecGroup(newSecGroup)
    }
  }
}
</script>

<style scoped>

</style>
