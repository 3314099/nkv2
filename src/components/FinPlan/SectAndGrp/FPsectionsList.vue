<template>
  <div>
    <div v-if="loading !== true && sectionsList.length === 0" class="text-center">
      <h1 class="font-weight-bold display-1 teal--text ">Список пуст</h1>
    </div>
    <div v-if="sectionsList.length">
    <ul class="pl-0 pt-0 mt-1">
      <v-container
        id="scroll-target"
        style="max-height: 560px"
        class="pt-1 pl-0 overflow-y-auto"
      >
        <li
          class=""
          v-for="(section, i) in sectionsList"
          :key="i"
          :draggable="draggable"
          @dragstart="dragStart(i, $event)"
          @dragover.prevent
          @dragenter="dragEnter"
          @dragleave="dragLeave"
          @dragend="dragEnd"
          @drop="dragFinish(i, $event)"
        >
          <v-card
            class="my-1"
            outlined
            :class="!section.visible ? 'grey lighten-4' : ''"
          >
            <v-card-actions :class="!section.visible ? 'grey lighten-4 ma-0 py-0' : ''" >
              <v-col cols="12" md="4" class="ma-0 pa-0">
                <v-icon>mdi-drag-vertical</v-icon>
                <v-btn
                  v-if="section.visible"
                  class="mr-2"
                  @click="chgFPSectionVisible(section)"
                  icon>
                  <v-icon>mdi-eye-outline</v-icon>
                </v-btn>
                <v-btn
                  v-if="!section.visible"
                  class="mr-2"
                  @click="chgFPSectionVisible(section)"
                  icon>
                  <v-icon>mdi-eye-off-outline</v-icon>
                </v-btn>
                <v-chip class="mx-2" small :color="section.color"> {{     }}</v-chip>
                <v-tooltip left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      class="pl-2"
                      v-bind="attrs"
                      v-on="on"
                      :small="!section.visible"
                      :class="!section.visible ? 'pl-5' : 'pl-2'"
                    >mdi-information-outline</v-icon>
                  </template>
                  <span>
                    <div v-if="section.comment">{{section.comment}}</div>
                    <div v-else>Нет комментариев</div>
                  </span>
                </v-tooltip>
                <span
                  :class="!section.visible ? 'font-weight-thin pl-2' : 'font-weight-black pl-2'"
                >
            {{section.title | toUpperCase}}
                  </span>
              </v-col>
              <v-col cols="12" md="3" class="ma-0 pa-0">
                <span
                  class="mx-2 font-weight-black headline "
                >
                  <v-chip
                    pa-0
                    small
                    class="ma-1"
                    :color="section.color"
                    label
                    text-color="white"
                  >
                    {{section.title}}
                  </v-chip>
                  <v-chip
                    pa-0
                    small
                    class="ma-1"
                    color="black"
                    label
                    outlined
                    text-color="black"
                  >
                    {{section.title}}
                  </v-chip>
                </span>
              </v-col>
              <v-spacer />
              <v-btn
                class="mr-2"
                @click="editSection(section)"
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
import FPsections from '@/mixins/FinPlan/FPsections.js'
export default {
  name: 'FPsectionsList',
  mixins: [FPsections],
  data: () => ({
    opacity: 0.7,
    dragging: -1,
    draggable: true
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    sectionsList () {
      return this.MXsortedRuEnFPSections()
    },
    isDragging () {
      return this.dragging > -1
    }
  },
  methods: {
    editSection (section) {
      this.$store.dispatch('chgItemMode', 'FPsection')
      this.$store.dispatch('chgEditItem', section)
      this.$store.dispatch('chgEditMode', 'edit')
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    },
    removeItem (item) {
      this.todos.splice(this.todos.indexOf(item), 1)
    },
    removeItemAt (index) {
      this.todos.splice(index, 1)
    },
    dragStart (which, ev) {
      ev.dataTransfer.setData('Text', this.id)
      ev.dataTransfer.dropEffect = 'move'
      this.dragging = which
    },
    dragEnter (ev) {
      if (ev.clientY > ev.target.height / 2) {
        ev.target.style.marginBottom = '0px'
      } else {
        ev.target.style.marginTop = '0px'
      }
    },
    dragLeave (ev) {
      ev.target.style.marginTop = '0px'
      ev.target.style.marginBottom = '0px'
    },
    dragEnd () {
      this.dragging = -1
    },
    dragFinish (to, ev) {
      this.moveItem(this.dragging, to)
      ev.target.style.marginTop = '0px'
      ev.target.style.marginBottom = '0px'
    },
    moveItem (from, to) {
      this.$store.dispatch('chgLoading', 'true')
      const sections = [...this.MXFPsectionsSortedBysectionsSerial()]
      sections.splice(to, 0, sections.splice(from, 1)[0])
      this.MXtoEditFPSectionSerial(this.UarrayFromObjectsArrayByField(sections, 'id'))
    },
    // chgFPSectionVisible (section) {
    //   section.visible = !section.visible
    //   this.MXtoEditFPSection(section)
    // }
    chgFPSectionVisible (section) {
      const newSection = Object.assign({}, section)
      newSection.visible = !section.visible
      this.MXtoEditFPSection(newSection)
    }
  }
}
</script>

<style scoped>

</style>
