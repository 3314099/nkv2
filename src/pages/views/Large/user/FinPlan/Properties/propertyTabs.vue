<template>
  <div>
    <v-card color="basil">
      <v-card-title class="text-center justify-center py-1">
        <h1 class="font-weight-bold display-1 basil--text">Настройки</h1>
      </v-card-title>
      <v-tabs
        v-model="propertyTabMode"
        background-color="transparent"
        color="basil"
        grow
      >
        <v-tab
          :href="'#sectAndGrp'"
          @click="toChangePropertyTabMode('sectAndGrp')"
        >
          РАЗДЕЛЫ И ГРУППЫ
        </v-tab>
        <v-tab
          :href="'#accounts'"
          @click="toChangePropertyTabMode('accounts')"
        >
          Счета
        </v-tab>
        <v-tab
          :href="'#filters'"
          @click="toChangePropertyTabMode('filters')"
        >
          Фильтры
        </v-tab>
        <v-tab
          :href="'#categories'"
          @click="toChangePropertyTabMode('categories')"
        >
          Категории
        </v-tab>
        <v-tab
          :href="'#tags'"
          @click="toChangePropertyTabMode('tags')"
        >
          Теги
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="propertyTabMode">
        <v-tab-item
          :value="'sectAndGrp'"
        >
          <SectAndGrp/>
        </v-tab-item>
        <v-tab-item
          :value="'accounts'"
        >
          <Accounts/>
        </v-tab-item>
        <v-tab-item
          :value="'filters'"
        >
              <filters/>
        </v-tab-item>
        <v-tab-item
          :value="'categories'"
        >
              <Categories/>
        </v-tab-item>
        <v-tab-item
          :value="'tags'"
        >
              <Tags/>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import SectAndGrp from '@/pages/views/Large/user/FinPlan/SectAndGrp/SectAndGrp'
import Accounts from '@/pages/views/Large/user/FinPlan/Accounts/Accounts'
import Filters from '@/pages/views/Large/user/Filters/Filters'
import Categories from '@/pages/views/Large/user/FinPlan/Categories/Categories'
import Tags from '@/pages/views/Large/user/Tags/Tags'
export default {
  name: 'propertyTabs',
  components: {
    SectAndGrp, Accounts, Filters, Categories, Tags
  },
  computed: {
    propertyTabMode: {
      get: function () {
        return this.$store.getters.propertyTabMode
      },
      set: function (v) {
      }
    }
  },
  methods: {
    toChangePropertyTabMode (propertyTabMode) {
      this.$store.dispatch('chgPropertyTabMode', propertyTabMode)
      switch (propertyTabMode) {
        case 'sectAndGrp':
          this.$store.dispatch('chgTableMode', 'sections')
          break
        case 'accounts':
          this.$store.dispatch('chgTableMode', 'zzzzzzzz')
          break
        case 'filters':
          this.$store.dispatch('chgTableMode', 'zzzzzzzzz')
          break
        case 'categories':
          this.$store.dispatch('chgTableMode', 'categories')
          break
        case 'tags':
          this.$store.dispatch('chgTableMode', 'zzzzzzz')
          break
        default:
          this.$store.dispatch('chgTableMode', 'zzzz')
      }
    }
  }
}
</script>

<style scoped>
  .basil--text {
    color: #356859 !important;
  }
</style>
