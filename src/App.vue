<template>
  <v-app>
    <v-component :is="layuot">
      <router-view />
    </v-component>
  </v-app>
</template>

<script>
import EmptyLayout from '@/pages/layouts/EmptyLayout'
import MainLayout from '@/pages/layouts/MainLayout'

export default {
  name: 'App',
  computed: {
    layuot () {
      return (this.$route.meta.layuot || 'EmptyLayout')
    }
  },

  components: {
    EmptyLayout, MainLayout
  }
}
</script>
