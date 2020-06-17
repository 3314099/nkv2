<template>
  <div>
    <v-card
      flat
    >
      <div class="d-flex justify-start justify-space-between">
        <div class="d-flex justify-space-between">
          <v-text-field
            class="pa-1"
            style="min-width: 280px"
            label="Строка поиска"
            type: String
            v-model="searchField"
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
                @click= "chgItemMode('sectionCreate')"
              >
                Создать раздел
              </v-btn>
            </div>
            <div
              class="pa-1"
            >
              <v-btn
                class="mx-1"
                outlined
                color="primary"
                @click= "chgItemMode('groupCreate')"
              >
                Создать группу
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'sectAndGrpDefault',
  data: function () {
    return {
      titleField: ''
    }
  },
  computed: {
    searchField: {
      get: function () {
        return this.$store.getters.searchField
      },
      set: function (v) {
        let searchField = ''
        v ? searchField = v : searchField = ''
        this.$store.dispatch('chgSearchField', searchField)
      }
    },
    childTitleField () {
      if (this.titleField) {
        return this.titleField
      } else {
        return ''
      }
    }
  },
  methods: {
    chgItemMode (itemMode) {
      this.titleField = ''
      this.$store.dispatch('chgItemMode', itemMode)
      this.$store.dispatch('chgEditMode', 'create')
    }
  }
}
</script>

<style scoped>

</style>
