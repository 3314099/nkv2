<template>
  <div>
    <div v-if="!!loading && !FPcategoriesLength" class="text-center">
      <h1 class="font-weight-bold display-1 teal--text ">Список пуст</h1>
    </div>
    <div v-else>
      <ul class="pl-0 pt-0 mt-1">
        <v-container
          id="scroll-target"
          style="max-height: 560px"
          class="pt-1 pl-0 overflow-y-auto"
        >
          <li
            class=""
            v-for="(FPcat, i) in FPcategoriesList"
            :key="i"
          >
            <v-card
              class="my-1"
              outlined
              :color="!FPcat.visible ? 'grey lighten-4' : ''"
            >
              <v-card-actions class="ma-0 pa-0" >
                <div
                  v-if="!FPcat.parentVisible"
                  class="ml-2"
                >
                <v-tooltip left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      class="ml-2"
                      v-bind="attrs"
                      v-on="on"
                    >mdi-table-eye-off</v-icon>
                  </template>
                  <span>
                    <div>Группа категорий скрыта</div>
                  </span>
                </v-tooltip>
                </div>
                <v-btn
                  v-if="FPcat.visible"
                  class="ml-2"
                  @click="chgFPCategoryVisible(FPcat)"
                  icon>
                  <v-icon>mdi-eye-outline</v-icon>
                </v-btn>
                <v-btn
                  v-if="!FPcat.visible && FPcat.parentVisible"
                  class="ml-2"
                  @click="chgFPCategoryVisible(FPcat)"
                  icon>
                  <v-icon
                    :color="!FPcat.parentId ? 'red' : ''"
                  >mdi-eye-off-outline</v-icon>
                </v-btn>
                <v-tooltip left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      :small="!FPcat.visible"
                      :class="!FPcat.visible ? 'ml-5' : 'ml-2'"
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
                    :class="!FPcat.visible || !FPcat.parentVisible ? 'font-weight-thin pl-2' : 'font-weight-black pl-2'"
                  >
                  {{FPcat.title | capitalize}}
                  </span>
                </v-col>
                <v-col cols="12" md="3" class="ma-0 pa-0">
                  <template v-if="!FPcat.newParentId">
                    <v-tooltip left>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          :small="!FPcat.visible"
                          class="ml-2"
                          v-bind="attrs"
                          v-on="on"
                          :color="!FPcat.newParentId ? 'red' : ''"
                        >mdi-folder-remove-outline</v-icon>
                      </template>
                      <span>
                    <div>Группа категорий не существует</div>
                  </span>
                    </v-tooltip>
                  </template>
                  <template v-if="FPcat.newParentId">
                  <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        :small="!FPcat.visible || !FPcat.parentVisible"
                        class="ml-2"
                        v-bind="attrs"
                        v-on="on"
                      >mdi-folder-information-outline</v-icon>
                    </template>
                    <span>
                    <div v-if="FPcat.FPcatGroupComment">{{FPcat.FPcatGroupComment}}</div>
                    <div v-else>Нет комментариев</div>
                  </span>
                  </v-tooltip>
                  </template>
                  <span
                    :class="!FPcat.visible || !FPcat.parentVisible ? 'font-weight-thin pl-2' : 'font-weight-black pl-2'"
                  >
                  {{FPcat.parentTitle | toUpperCase}}
                  </span>
                </v-col>
                <v-spacer />
                <v-switch
                  :dense="!FPcat.visible"
                  :input-value="FPcat.expenses"
                  @change="toChangeSwitch(FPcat, 'expenses')"
                  class="px-0 mt-0 mr-12 pb-0"
                  label="Расходы"
                  :color="FPcat.visible ? 'success' : 'grey lighten-1'"
                  hide-details
                >
                </v-switch>
                <v-switch
                  :dense="!FPcat.visible"
                  :input-value="FPcat.entrances"
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
  data () {
    return {
      categoriesList: []
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    FPcategoriesLength () {
      return !!this.MXsortedRuEnFPcategories().length
    },
    FPcategoriesArray () {
      const newFPcategories = [...this.MXFPcategories()]
      if (newFPcategories) {
        newFPcategories.forEach((FPcategory) => {
          FPcategory.type = 'FPCategory'
          FPcategory.parentVisible = true
          const catGroup = this.MXFPcatGroups()
            .find(FPcatGroup => FPcatGroup.id === FPcategory.parentId)
          if (catGroup) {
            FPcategory.newParentId = catGroup.id
            FPcategory.parentTitle = catGroup.title
            FPcategory.parentRating = catGroup.rating
            FPcategory.parentComment = catGroup.comment
            !FPcategory.catVisible
              ? FPcategory.visible = false : FPcategory.visible = true
            if (!catGroup.visible) {
              FPcategory.parentVisible = false
              FPcategory.visible = false
            } else {
              FPcategory.parentVisible = true
            }
          } else {
            FPcategory.newParentId = ''
            FPcategory.parentTitle = 'Без группы'
            FPcategory.parentRating = 1
            FPcategory.parentComment = ''
            FPcategory.parentVisible = true
            FPcategory.visible = false
          }
        }
        )
        return newFPcategories
      } else {
        return []
      }
    },
    FPcategoriesList () {
      let newFPcategories = this.FPcategoriesArray
      newFPcategories = this.UsortByVisibleButton(newFPcategories)
      newFPcategories = this.UsortBySortButton(newFPcategories, this.$store.getters.sortButton)
      newFPcategories = this.UsortRuEnArray(newFPcategories, this.UsearchField())
      return newFPcategories
    }
  },
  methods: {
    editFPCategory (FPcategory) {
      this.$store.dispatch('chgItemMode', 'FPcategory')
      this.$store.dispatch('chgLeftBarMode')
      this.$store.dispatch('chgEditItem', FPcategory)
      this.$store.dispatch('chgEditMode', 'edit')
      eventEmitter.$emit('toChgByEditItem')
    },
    toChangeSwitch (item, type) {
      const newItem = Object.assign({}, item)
      if (type === 'expenses') {
        newItem.expenses = !item.expenses
        if (!newItem.expenses) { newItem.entrances = true }
      } else {
        newItem.entrances = !item.entrances
        if (!newItem.entrances) { newItem.expenses = true }
      }
      this.MXtoEditFPCategory(newItem)
    },
    chgFPCategoryVisible (cat) {
      const newCat = Object.assign({}, cat)
      newCat.catVisible = !cat.catVisible
      this.MXtoEditFPCategory(newCat)
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    }
  }
}
</script>

<style scoped>

</style>
