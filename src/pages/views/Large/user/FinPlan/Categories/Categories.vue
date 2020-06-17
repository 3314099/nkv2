<template>
  <div class="ma-4">
    <v-tabs-items v-model="categoriesMode">
      <v-tab-item
        :value="'categoriesDefault'"
      >
        <categoriesDefault/>
      </v-tab-item>
      <v-tab-item
        :value="'catGroupCreate'"
      >
        <catGroupEdit/>
      </v-tab-item>
      <v-tab-item
        :value="'categoryCreate'"
      >
        <categoryEdit/>
      </v-tab-item>
      <v-tab-item
        :value="'catGroupEdit'"
      >
        <catGroupEdit/>
      </v-tab-item>
      <v-tab-item
        :value="'categoryEdit'"
      >
        <categoryEdit/>
      </v-tab-item>
    </v-tabs-items>
    <CategoriesTables/>
  </div>
</template>

<script>
import categoriesDefault from '@/components/Categories/categoriesDefault'
import catGroupEdit from '@/components/Categories/catGroupEdit'
import categoryEdit from '@/components/Categories/categoryEdit'
import CategoriesTables from '@/pages/views/Large/user/FinPlan/Categories/CategoriesTables'
export default {
  name: 'SectAndGrp',
  components: {
    categoriesDefault,
    catGroupEdit,
    categoryEdit,
    CategoriesTables
  },
  computed: {
    itemMode () {
      return this.$store.getters.itemMode
    },
    categoriesMode: {
      get: function () {
        const itemMode = this.$store.getters.itemMode
        let categoriesMode = ''
        switch (itemMode) {
          case 'catGroupCreate':
            categoriesMode = 'catGroupCreate'
            this.$store.dispatch('chgTableMode', 'catGroups')
            break
          case 'categoryCreate':
            categoriesMode = 'categoryCreate'
            this.$store.dispatch('chgTableMode', 'categories')
            break
          case 'catGroupEdit':
            categoriesMode = 'catGroupEdit'
            break
          case 'categoryEdit':
            categoriesMode = 'categoryEdit'
            break
          default:
            categoriesMode = 'categoriesDefault'
        }
        return categoriesMode
      },
      set: function (v) {
      }
    }
  }
}
</script>

<style scoped>

</style>
