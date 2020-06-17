<template>
  <div>
    <div v-if="loading !== true && sections.length === 0" class="text-center">
      <h1 class="font-weight-bold display-1 teal--text ">Список пуст</h1>
    </div>
    <div v-if="sections.length">
    <ul class="pl-0 pt-0 mt-1">
      <v-container
        id="scroll-target"
        style="max-height: 560px"
        class="pt-1 pl-0 overflow-y-auto"
      >
        <li
          class=""
          v-for="(section, i) in sections"
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
          >
            <v-card-actions class="ma-0 px-0" >
              <v-col cols="12" md="4" class="ma-0 pa-0">
                <v-icon>mdi-drag-vertical</v-icon>
                <v-chip class="mx-2" small :color="section.color"> {{     }}</v-chip>
                <v-btn
                  v-if="section.selected"
                  @click="toChangeCheckAccount(false, account.id)"
                  icon>
                  <v-icon>mdi-check-box-outline</v-icon>
                </v-btn>
                <v-btn
                  @click="toChangeCheckAccount(true,account.id)"
                  icon
                >
                  <v-icon>mdi-checkbox-blank-outline</v-icon>
                </v-btn>
                <span
                  class="font-weight-black text-transform: uppercase"
                >
            {{section.title}}
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
              <v-col cols="1" class="ma-0 pa-0">
                <v-switch
                  hide-details
                  class="ma-0 pa-0"
                  v-model="section.expenses"
                  @change="toChangeSwitch('expenses',item.expenses, item)"
                  color="success"
                ></v-switch>
              </v-col>
                <v-col cols="1" class="ma-0 pa-0">
                <v-switch
                  hide-details
                  class="ma-0 pa-0"
                  v-model="section.entrances"
                  @change="toChangeSwitch('entrances',item.entrances, item)"
                  color="primary"
                ></v-switch>
              </v-col>
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
import sections from '@/mixins/sections.js'
export default {
  name: 'sectionsList',
  mixins: [sections],
  data: () => ({
    opacity: 0.7,
    dragging: -1,
    draggable: true
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    sections () {
      return this.MXsortedRuEnSections()
    },
    isDragging () {
      return this.dragging > -1
    }
  },
  methods: {
    editSection (section) {
      this.$store.dispatch('chgItemMode', 'sectionEdit')
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
      const sections = this.MXsections()
      sections.splice(to, 0, sections.splice(from, 1)[0])
      this.MXtoEditSectionSerial(this.UarrayFromObjectsArrayByField(sections, 'id'))
    }
  }
}
</script>

<style scoped>

</style>
