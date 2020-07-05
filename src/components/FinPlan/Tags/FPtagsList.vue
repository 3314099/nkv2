<template>
  <div>
    <div v-if="loading !== true && tagGroupsList.length === 0" class="text-center">
      <h1 class="font-weight-bold display-1 teal--text ">Список пуст</h1>
    </div>
    <div v-if="tagGroupsList.length">
      <ul class="pl-0 pt-0 mt-1">
        <v-container
          id="scroll-target"
          style="max-height: 560px"
          class="pt-1 pl-0 overflow-y-auto"
        >
          <li
            class=""
            v-for="(item, i) in tagGroupsList"
            :key="i"
          >
            <v-card
              class="my-1"
              outlined
              :class="!item.visible ? 'grey lighten-4' : ''"
            >
              <v-card-title
                class="ma-0 pх-1 py-0"
              >
                <v-col cols="12" md="4" class="ma-0 pa-0">
                <v-btn
                  v-if="item.visible"
                  class="mr-2"
                  @click="chgFPtagGroupVisible(item)"
                  icon>
                  <v-icon>mdi-eye-outline</v-icon>
                </v-btn>
                <v-btn
                  v-if="!item.visible"
                  class="mr-2"
                  @click="chgFPtagGroupVisible(item)"
                  icon>
                  <v-icon>mdi-eye-off-outline</v-icon>
                </v-btn>
                <v-tooltip left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      :small="!item.visible"
                      :class="!item.visible ? 'pl-5' : 'pl-2'"
                      v-bind="attrs"
                      v-on="on"
                    >mdi-folder-information-outline</v-icon>
                  </template>
                  <span>
                    <div v-if="item.comment">{{item.comment}}</div>
                    <div v-else>Нет комментариев</div>
                  </span>
                </v-tooltip>
                <span
                  style="cursor: pointer"
                  :class="!item.visible ? 'font-weight-thin pl-2' : 'font-weight-black pl-2'"
                  @click="chgStdFPTagGroup(item)"
                >
                    {{item.title | toUpperCase}}
                </span>
              </v-col>
                <v-col cols="12" md="3" class="ma-0 pa-0">
                <span>
                  <v-rating
                    :class="item.visible ? 'pa-0' : 'ml-5'"
                    :value="item.rating"
                    :length="9"
                    hover
                    dense
                    background-color="teal lighten-3"
                    color="teal"
                    :readonly="!item.visible"
                    :small="!item.visible"
                    large
                    @input="chgRating($event, item)"
                  >
                  </v-rating>
                </span>
                </v-col>
                <v-spacer />
                <v-btn
                  class="mr-0"
                  @click="toEditFPTagGroup(item)"
                  icon>
                  <v-icon>mdi-lead-pencil</v-icon>
                </v-btn>
              </v-card-title>
              <v-divider class="mx-4"></v-divider>
              <v-card-actions>
                <v-chip
                  v-for="(tag, k) in item.tags"
                  :key="k"
                  :color="!tag.visible && !tag.outlined ? 'grey grey darken-1 ma-0 py-1' : 'black py-1'"
                  small
                  label
                  :disabled="!tag.visible"
                  :text-color="!tag.visible ? 'grey grey darken-1 ma-0 py-1' : 'black py-1'"
                  filter: true
                  outlined
                  class="mx-1"
                  close
                  close-icon="mdi-trash-can-outline"
                  @click:close="toRemoveTag(tag.id)"
                >
                  {{tag.title | toLowerCase}}
                </v-chip>
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
import FPtags from '@/mixins/FinPlan/FPtags.js'
export default {
  name: 'FPtagsList',
  mixins: [FPtags],
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    tagGroupsList () {
      let newFPtagGroups = []
      let tags = []
      if (this.$store.getters.itemMode === 'FPtagsGroup') {
        newFPtagGroups = [...this.MXsortedRuEnFPtagGroups()]
        tags = [...this.MXFPtags()]
      } else {
        newFPtagGroups = [...this.MXFPtagGroupsSortedBySortButton()]
        tags = this.UsortRuEnArray([...this.MXFPtags()], this.UsearchField())
      }
      newFPtagGroups.forEach((item) => {
        item.type = 'FPtagGroup'
        const newTags = tags.filter(tag => item.id === tag.parentId)
        newTags.forEach((tag) => {
          tag.visible = item.visible
        })
        item.tags = newTags
        return item
      })
      return newFPtagGroups.filter(item => item.tags.length)
    }
  },
  methods: {
    editSection (item) {
      this.$store.dispatch('chgItemMode', 'FPsection')
      this.$store.dispatch('chgEditItem', item)
      this.$store.dispatch('chgEditMode', 'edit')
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    },
    chgFPtagGroupVisible (item) {
      const newItem = Object.assign({}, item)
      newItem.visible = !item.visible
      this.MXtoEditFPtagGroup(newItem)
    },
    chgRating (value, item) {
      const newItem = Object.assign({}, item)
      newItem.rating = value
      this.MXtoEditFPtagGroup(newItem)
    },
    toRemoveTag (id) {
      this.MXtoRemoveFPTag(id)
    },
    toEditFPTagGroup (FPtagsGroup) {
      this.$store.dispatch('chgItemMode', 'FPtagsGroup')
      this.$store.dispatch('chgEditItem', FPtagsGroup)
      this.$store.dispatch('chgEditMode', 'edit')
      eventEmitter.$emit('toChgByEditItem')
    },
    chgStdFPTagGroup (id) {
      this.$store.dispatch('chgStdFPTagGroup', id)
      eventEmitter.$emit('changedStdFPTagGroup')
    }
  }
}
</script>

<style scoped>

</style>
