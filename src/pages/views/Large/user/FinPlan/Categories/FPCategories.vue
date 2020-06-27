<template>
  <div class="ma-4">
    <v-tabs-items v-model="FPcategoriesMode">
      <v-tab-item
        :value="'FPcategoriesDefault'"
      >
        <FPcategoriesDefault/>
      </v-tab-item>
      <v-tab-item
        :value="'FPcatGroupCreate'"
      >
        <FPcatGroupEdit/>
      </v-tab-item>
      <v-tab-item
        :value="'FPcategoryCreate'"
      >
        <FPcategoryEdit/>
      </v-tab-item>
      <v-tab-item
        :value="'FPcatGroupEdit'"
      >
        <FPcatGroupEdit/>
      </v-tab-item>
      <v-tab-item
        :value="'FPcategoryEdit'"
      >
        <FPcategoryEdit/>
      </v-tab-item>
    </v-tabs-items>
    <FPCategoriesTables/>
  </div>
</template>

<script>
import FPcategoriesDefault from '@/components/FinPlan/Categories/FPcategoriesDefault'
import FPcatGroupEdit from '@/components/FinPlan/Categories/FPcatGroupEdit'
import FPcategoryEdit from '@/components/FinPlan/Categories/FPcategoryEdit'
import FPCategoriesTables from '@/pages/views/Large/user/FinPlan/Categories/FPCategoriesTables'
export default {
  name: 'SectAndGrp',
  components: {
    FPcategoriesDefault,
    FPcatGroupEdit,
    FPcategoryEdit,
    FPCategoriesTables
  },
  computed: {
    itemMode () {
      return this.$store.getters.itemMode
    },
    FPcategoriesMode: {
      get: function () {
        const itemMode = this.$store.getters.itemMode
        let categoriesMode = ''
        switch (itemMode) {
          case 'FPcatGroupCreate':
            categoriesMode = 'FPcatGroupCreate'
            this.$store.dispatch('chgTableMode', 'FPcatGroups')
            break
          case 'FPcategoryCreate':
            categoriesMode = 'FPcategoryCreate'
            this.$store.dispatch('chgTableMode', 'FPcategories')
            break
          case 'FPcatGroupEdit':
            categoriesMode = 'FPcatGroupEdit'
            break
          case 'FPcategoryEdit':
            categoriesMode = 'FPcategoryEdit'
            break
          default:
            categoriesMode = 'FPcategoriesDefault'
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
