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
          :href="'#FPsectAndGrp'"
          @click="toChangePropertyTabMode('FPsectAndGrp')"
        >
          РАЗДЕЛЫ И ГРУППЫ
        </v-tab>
        <v-tab
          :href="'#FPaccounts'"
          @click="toChangePropertyTabMode('FPaccounts')"
        >
          Счета
        </v-tab>
        <v-tab
          :href="'#FPfilters'"
          @click="toChangePropertyTabMode('FPfilters')"
        >
          Фильтры
        </v-tab>
        <v-tab
          :href="'#FPcategories'"
          @click="toChangePropertyTabMode('FPcategories')"
        >
          Категории
        </v-tab>
        <v-tab
          :href="'#FPtags'"
          @click="toChangePropertyTabMode('FPtags')"
        >
          Теги
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="propertyTabMode">
        <v-tab-item
          :value="'FPsectAndGrp'"
        >
          <FPSectAndGrp/>
        </v-tab-item>
        <v-tab-item
          :value="'FPaccounts'"
        >
          <FPAccounts/>
        </v-tab-item>
        <v-tab-item
          :value="'FPfilters'"
        >
              <FPFilters/>
        </v-tab-item>
        <v-tab-item
          :value="'FPcategories'"
        >
              <FPCategories/>
        </v-tab-item>
        <v-tab-item
          :value="'FPtags'"
        >
              <FPTags/>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import FPSectAndGrp from '@/pages/views/Large/user/FinPlan/SectAndGrp/FPSectAndGrp'
import FPAccounts from '@/pages/views/Large/user/FinPlan/Accounts/FPAccounts'
import FPFilters from '@/pages/views/Large/user/FinPlan/Filters/FPFilters'
import FPCategories from '@/pages/views/Large/user/FinPlan/Categories/FPCategories'
import FPTags from '@/pages/views/Large/user/FinPlan/Tags/FPTags'
export default {
  name: 'propertyTabs',
  components: {
    FPSectAndGrp,
    FPAccounts,
    FPFilters,
    FPCategories,
    FPTags
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
      this.$store.dispatch('resetStdItems')
      let chgItemMode = ''
      let chgTableMode = ''
      switch (propertyTabMode) {
        case 'FPsectAndGrp':
          chgItemMode = 'FPsections'
          chgTableMode = 'FPsections'
          break
        case 'FPaccounts':
          break
        case 'FPfilters':
          break
        case 'FPcategories':
          chgItemMode = 'FPcategories'
          chgTableMode = 'FPcategories'
          break
        case 'FPtags':
          chgItemMode = 'default'
          chgTableMode = 'FPtags'
          break
        default:
          chgItemMode = 'default'
          chgTableMode = 'FPsections'
          break
      }
      this.$store.dispatch('chgTableMode', chgTableMode)
      this.$store.dispatch('chgItemMode', chgItemMode)
      this.$store.dispatch('chgEditMode', '')
      this.$store.dispatch('chgLeftBarMode')
      this.$store.dispatch('clearFields')
      this.$store.dispatch('chgEditItem', {})
    }
  }
}
</script>

<style scoped>
  .basil--text {
    color: #356859 !important;
  }
</style>
