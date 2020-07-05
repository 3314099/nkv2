<template>
  <div>
    <v-card
      flat
    >
      <div class="d-flex justify-start justify-space-between">
        <div class="d-flex justify-space-between">
          <v-text-field
            autofocus
            class="pa-1"
            style="min-width: 280px"
            label="Строка поиска"
            type: String
            v-model="titleField"
            dense
            outlined
            small
            clearable
          >
          </v-text-field>
        </div>
        <div class="d-flex" >
          <div class="d-flex flex-wrap justify-space-around">
            <div
              class="pa-1"
            >
              <v-btn
                class="mx-1"
                outlined
                color="primary"
                @click="chgItemMode('FPcatGroup')"
              >
                Создать группу категорий
              </v-btn>
            </div>
            <div
              class="pa-1"
            >
              <v-btn
                :disabled="!FPcatGroupsLength"
                class="mx-1"
                outlined
                color="primary"
                @click="chgItemMode('FPcategory')"
              >
                Создать категорию
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import FPcategories from '@/mixins/FinPlan/FPcategories.js'
export default {
  name: 'FPcategoriesDefault',
  mixins: [FPcategories],
  computed: {
    titleField: {
      get: function () {
        return this.$store.getters.searchField
      },
      set: function (v) {
        let searchField = ''
        v ? searchField = v : searchField = ''
        this.$store.dispatch('chgSearchField', searchField)
      }
    },
    FPcatGroupsLength () {
      return !!this.MXFPcatGroups().length
    }
  },
  methods: {
    chgItemMode (itemMode) {
      this.$store.dispatch('chgItemMode', itemMode)
      this.$store.dispatch('chgEditMode', 'create')
      this.$store.dispatch('chgLeftBarMode')
    }
  }
}
</script>

<style scoped>

</style>
