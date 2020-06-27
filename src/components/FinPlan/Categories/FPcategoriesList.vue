<template>
  <div>
    <div v-if="!!loading && !FPcategories.length" class="text-center">
      <h1 class="font-weight-bold display-1 teal--text ">Список пуст</h1>
    </div>
    <div v-if="FPcategories.length">
      <ul class="pl-0 pt-0 mt-1">
        <v-container
          id="scroll-target"
          style="max-height: 560px"
          class="pt-1 pl-0 overflow-y-auto"
        >
          <li
            class=""
            v-for="(FPcat, i) in FPcategories"
            :key="i"
          >
            <v-card
              class="my-1"
              outlined
            >
              <v-card-actions class="ma-0 pa-0" >
                <v-btn
                  v-if="FPcat.visible"
                  class="mr-2"
                  @click="chgFPCategoryVisible(FPcat)"
                  icon>
                  <v-icon>mdi-eye-outline</v-icon>
                </v-btn>
                <v-btn
                  v-if="!FPcat.visible"
                  class="mr-2"
                  @click="chgFPCategoryVisible(FPcat)"
                  icon>
                  <v-icon>mdi-eye-off-outline</v-icon>
                </v-btn>
                <v-tooltip left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      :small="!FPcat.visible"
                      class="pl-2"
                      v-bind="attrs"
                      v-on="on"
                    >mdi-information-outline</v-icon>
                  </template>
                  <span>
                    <div v-if="FPcat.comment">{{FPcat.comment}}</div>
                    <div v-else>Нет комментариев</div>
                  </span>
                </v-tooltip>
                <v-col cols="12" md="3" class="ma-0 pa-0">
                  <span
                    :class="FPcat.visible ? 'font-weight-black pl-2' : 'font-weight-thin pl-2'"
                  >
                  {{FPcat.title | capitalize}}
                  </span>
                </v-col>
                <v-col cols="12" md="3" class="ma-0 pa-0">
                  <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        :small="!FPcat.visible"
                        class="pl-2"
                        v-bind="attrs"
                        v-on="on"
                        :color="!FPcat.FPcatGroupId ? 'red' : ''"
                      >mdi-folder-information-outline</v-icon>
                    </template>
                    <span>
                    <div v-if="FPcat.FPcatGroupComment">{{FPcat.FPcatGroupComment}}</div>
                    <div v-else>Нет комментариев</div>
                  </span>
                  </v-tooltip>
                  <span
                    :class="FPcat.visible ? 'font-weight-black pl-2' : 'font-weight-thin pl-2'"
                  >
                  {{FPcat.FPcatGroupTitle | toUpperCase}}
                  </span>
                </v-col>
                <v-spacer />
                <v-switch
                  :dense="!FPcat.visible"
                  v-model="FPcat.expenses"
                  @change="toChangeSwitch(FPcat, 'expenses')"
                  class="px-0 mt-0 mr-12 pb-0"
                  label="Расходы"
                  :color="FPcat.visible ? 'success' : 'grey lighten-1'"
                  hide-details
                >
                </v-switch>
                <v-switch
                  :dense="!FPcat.visible"
                  v-model="FPcat.entrances"
                  @change="toChangeSwitch(FPcat, 'entrances')"
                  class="pa-0 my-0 mr-12"
                  label="Поступления"
                  :color="FPcat.visible ? 'primary' : 'grey lighten-1'"
                  hide-details
                >
                </v-switch>
                <v-btn
                  class="mr-2"
                  @click="editFPCategory(FPcat)"
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
  name: 'FPcategoriesList',
  mixins: [FPcategories],
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    FPcategories () {
      return this.MXsortedRuEnFPCategories()
    },
    FPcatGroupTitleClass (FPcat) {
      let classId = ''
      let classVi = ''
      if (!FPcat.FPcatGroupId) { classId = 'red--text' }
      if (!FPcat.visible) {
        classVi = 'font-weight-thin'
      } else {
        classVi = 'font-weight-black'
      }
      return classId + classVi + 'pl-2'
    }
  },
  methods: {
    editFPCategory (FPcategory) {
      this.$store.dispatch('chgItemMode', 'FPcategoryEdit')
      this.$store.dispatch('chgEditItem', FPcategory)
      this.$store.dispatch('chgEditMode', 'edit')
      eventEmitter.$emit('toChgByEditItem')
    },
    toChangeSwitch (FPcat, type) {
      if (type === 'expenses') {
        if (!FPcat.expenses) { FPcat.entrances = true }
      } else {
        if (!FPcat.entrances) { FPcat.expenses = true }
      }
      this.MXtoEditFPCategory(FPcat)
    },
    chgFPCategoryVisible (FPcat) {
      FPcat.visible = !FPcat.visible
      this.MXtoEditFPCategory(FPcat)
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    }
  }
}
</script>

<style scoped>

</style>
