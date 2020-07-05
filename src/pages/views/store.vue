<template>
  <div>
    <v-card class="my-1 pa-1">
      <v-container
        id="scroll-target"
        style="max-height: 550px"
        class="pt-0 pl-0 overflow-y-auto"
      >
        <ul class="pl-0 pt-0 mt-1">
          <div class="font-weight-black text-center grey lighten-3">
            <h3>src/store/modes.js</h3>
          </div>
          <li
            class=""
            v-for="(item, i) in modes"
            :key="i"
          >
            <v-card
              class="my-1"
              outlined
            >
              <v-card-actions class="ma-0 px-1 py-0" >
                  <span
                    class="font-weight-black"
                  >
                  {{item[0]}}
                  </span>
                <v-spacer />
                {{item[1]}}
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
        </ul>
        <ul class="pl-0 pt-0 mt-1">
          <div class="font-weight-black text-center grey lighten-3">
            <h3>src/store/utils.js</h3>
          </div>
          <li
            class=""
            v-for="(item, i) in utils"
            :key="i"
          >
            <v-card
              class="my-1"
              outlined
            >
              <v-card-actions class="ma-0 px-1 py-0" >
                  <span
                    class="font-weight-black"
                  >
                  {{item[0]}}
                  </span>
                <v-spacer />
                {{item[1]}}
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
        </ul>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'store',
  computed: {
    modes () {
      const modes = {}
      modes.mainPageMode = this.$store.getters.mainPageMode
      modes.pageMode = this.$store.getters.pageMode
      modes.itemMode = this.$store.getters.itemMode
      modes.editMode = this.$store.getters.editMode
      modes.leftBarMode = this.$store.getters.leftBarMode
      modes.propertyTabMode = this.$store.getters.propertyTabMode
      modes.sortButton = this.$store.getters.sortButton
      modes.visibleButton = this.$store.getters.visibleButton
      modes.LBsortButton = this.$store.getters.LBsortButton
      modes.visibility = this.$store.getters.visibility
      modes.tableMode = this.$store.getters.tableMode
      modes.rightBarMode = this.$store.getters.rightBarMode
      const newmodes = Object.entries(modes)
      return newmodes
    },
    utils () {
      const modes = {}
      modes.editItem = this.$store.getters.editItem
      modes.loading = this.$store.getters.loading
      modes.searchField = this.$store.getters.searchField
      modes.LBsearchField = this.$store.getters.LBsearchField
      modes.commentField = this.$store.getters.commentField
      modes.rating = this.$store.getters.rating
      const newmodes = Object.entries(modes)
      return newmodes
    }
  },
  methods: {
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    }
  }
}
</script>

<style scoped>

</style>
