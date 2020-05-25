<template>
  <div>
    <v-card color="basil">
      <v-card-title class="text-center justify-center py-1">
        <h1 class="font-weight-bold display-3 basil--text">Настройки</h1>
      </v-card-title>
      <v-tabs
        v-model="propertyTabMode"
        background-color="transparent"
        color="basil"
        grow
      >
        <v-tab
          :href="'#targets'"
          @click="toChangePropertyTabMode('targets')"
        >
          Цели
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
          :value="'targets'"
        >
          <Targets/>
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
import Targets from '@/pages/views/Large/user/FinPlan/Targets/Targets'
import Accounts from '@/pages/views/Large/user/FinPlan/Accounts/Accounts'
import Filters from '@/pages/views/Large/user/Filters/Filters'
import Categories from '@/pages/views/Large/user/FinPlan/Categories/Categories'
import Tags from '@/pages/views/Large/user/Tags/Tags'
export default {
  name: 'propertyTabs',
  components: {
    Targets, Accounts, Filters, Categories, Tags
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
    }
  }
}
</script>

<style scoped>
  .basil--text {
    color: #356859 !important;
  }
</style>
