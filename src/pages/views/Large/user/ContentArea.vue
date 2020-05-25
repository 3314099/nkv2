<template>
  <div>
    <v-card class="d-flex flex-grow-1">
    <v-tabs-items v-model="CTabs" style="width: 100%">
      <v-tab-item
        :value="'targets'"
      >
        <h1>Targets Content</h1>
      </v-tab-item>
      <v-tab-item
        :value="'accounts'"
      >
        <h1>accounts Content</h1>
      </v-tab-item>
      <v-tab-item
        :value="'operations'"
      >
        <h1>operations Content</h1>
      </v-tab-item>
      <v-tab-item
        :value="'statistic'"
      >
        <h1>statistic Content</h1>
      </v-tab-item>
      <v-tab-item
        :value="'properties'"
      >
        <propertyTabs/>
      </v-tab-item>
      <v-tab-item
        :value="'user'"
      >
        <user/>
      </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import user from '@/pages/views/Large/user/user'
import propertyTabs from '@/pages/views/Large/user/FinPlan/Properties/propertyTabs'
export default {
  name: 'ContentArea',
  components: {
    user,
    propertyTabs
  },
  computed: {
    CTabs () {
      return this.$store.getters.pageMode
    }
  }
}
</script>

<style scoped>

</style>
