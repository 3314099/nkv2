<template>
  <div>
    <div v-if="loading !== true && catGroups.length === 0" class="text-center">
      <h1 class="font-weight-bold display-1 teal--text ">Список пуст</h1>
    </div>
    <div v-if="catGroups.length">
      <ul class="pl-0 pt-0 mt-1">
        <v-container
          id="scroll-target"
          style="max-height: 560px"
          class="pt-1 pl-0 overflow-y-auto"
        >
          <li
            class=""
            v-for="(catGroup, i) in catGroups"
            :key="i"
          >
            <v-card
              class="my-1"
              outlined
            >
              <v-card-actions class="ma-0 pa-0" >
                <span>
              <v-btn
                class="mr-2"
                @click="editSection(section)"
                icon>
                <v-icon>mdi-information-outline</v-icon>
              </v-btn>
              </span>
                <v-col cols="12" md="4" class="ma-0 pa-0">
                  <span
                    class="font-weight-black text-transform: uppercase pl-2"
                  >
                  {{catGroup.title}}
                  </span>
                </v-col>
                <v-col cols="12" md="4" class="ma-0 pa-0">
                  <span>
                     <v-rating
                       class="pa-0"
                       :value="catGroup.rating"
                       :length="9"
                       hover
                       background-color="teal lighten-3"
                       color="teal"
                       large
                       @input="chgRating($event, catGroup)"
                     ></v-rating>
                  </span>
                </v-col>
                <v-spacer />
                <v-btn
                  class="mr-2"
                  @click="editCatGroup(catGroup)"
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
import categories from '@/mixins/categories.js'
export default {
  name: 'catGropsList',
  mixins: [categories],
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    catGroups () {
      return this.MXsortedRuEnCatGroups()
    }
  },
  methods: {
    editCatGroup (catGroup) {
      this.$store.dispatch('chgItemMode', 'catGroupEdit')
      this.$store.dispatch('chgEditItem', catGroup)
      this.$store.dispatch('chgEditMode', 'edit')
      eventEmitter.$emit('toChgByEditItem')
    },
    chgRating (value, catGroup) {
      catGroup.rating = value
      this.MXtoEditCatGroup(catGroup)
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    }
  }
}
</script>

<style scoped>

</style>
