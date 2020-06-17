<template>
  <div>
    <v-card
      class="my-0"
      :loading="loading"
      outlined
    >
      <div class="my-2 py-0 px-2">
        <v-row no-gutters style="flex-wrap: nowrap;">
          <v-col>
            <v-divider class="my-3"></v-divider>
          </v-col>
          <v-col
            cols="3"
            class="d-flex justify-center"
          >
            <div>
              <v-chip
                :disabled="disableTableMode === 'catGroups'"
                class="mx-2"
                small
                color="teal"
                :text-color= "categoriesTable === 'catGroups' ? 'white' : 'black'"
                :outlined= "categoriesTable !== 'catGroups'"
                @click="chgTableMode('catGroups')"
              >
                <h3>Группы категорий</h3>
              </v-chip>
              <v-chip
                :disabled="disableTableMode === 'categories'"
                class="mx-2"
                small
                color="teal"
                :text-color= "categoriesTable === 'categories' ? 'white' : 'black'"
                :outlined= "categoriesTable === 'categories' ? false : true"
                @click="chgTableMode('categories')"
              >
                <h3>Категории</h3>
              </v-chip>
            </div>
          </v-col>
          <v-col>
            <v-divider class="my-3"></v-divider>
          </v-col>
        </v-row>
      </div>
    </v-card>
    <v-window
      v-model="winMode"
      class="my-2"
      vertical
    >
      <v-window-item>
        <catGroupsList/>
      </v-window-item>
      <v-window-item>
        <categoriesList/>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import catGroupsList from '@/components/Categories/catGroupsList'
import categoriesList from '@/components/Categories/categoriesList'
export default {
  name: 'CategoriesTables',
  components: {
    catGroupsList,
    categoriesList
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    categoriesTable () {
      return this.$store.getters.tableMode
    },
    disableTableMode () {
      const itemMode = this.$store.getters.itemMode
      let disableTableMode = ''
      switch (itemMode) {
        case 'catGroupsCreate':
          disableTableMode = 'catGroups'
          break
        case 'catGroupsEdit':
          disableTableMode = 'catGroups'
          break
        case 'categoriesCreate':
          disableTableMode = 'categories'
          break
        case 'categoriesEdit':
          disableTableMode = 'categories'
          break
        default:
          disableTableMode = ''
      }
      return disableTableMode
    },
    winMode () {
      let winMode = 0
      switch (this.categoriesTable) {
        case 'catGroups':
          winMode = 0
          break
        case 'categories':
          winMode = 1
          break
        default:
          winMode = 0
      }
      return winMode
    }
  },
  methods: {
    chgTableMode (tableMode) {
      this.$store.dispatch('chgTableMode', tableMode)
    }
  }
}
</script>

<style scoped>

</style>
