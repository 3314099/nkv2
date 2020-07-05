<template>
  <div class="ma-4">
    <v-tabs-items v-model="FPtagsMode">
      <v-tab-item
        :value="'FPtagsDefault'"
      >
        <FPtagsDefault/>
      </v-tab-item>
      <v-tab-item
        :value="'FPtagsGroupEdit'"
      >
        <FPtagsGroupEdit/>
      </v-tab-item>
    </v-tabs-items>
    <FPTagsTables/>
  </div>
</template>

<script>
import FPtagsDefault from '@/components/FinPlan/Tags/FPtagsDefault'
import FPtagsGroupEdit from '@/components/FinPlan/Tags/FPtagsGroupEdit'
import FPTagsTables from '@/pages/views/Large/user/FinPlan/Tags/FPTagsTables'

export default {
  name: 'FPTags',
  components: {
    FPtagsDefault,
    FPtagsGroupEdit,
    FPTagsTables
  },
  computed: {
    itemMode: {
      get: function () {
        return this.$store.getters.itemMode
      }
    },
    FPtagsMode: {
      get: function () {
        let tagsMode = ''
        switch (this.$store.getters.itemMode) {
          case 'FPtagsGroup':
            tagsMode = 'FPtagsGroupEdit'
            this.$store.dispatch('chgTableMode', 'FPtagsGroup')
            break
          default:
            tagsMode = 'FPtagsDefault'
        }
        return tagsMode
      },
      set: function (v) {
      }
    }
  }
}
</script>

<style scoped>

</style>
