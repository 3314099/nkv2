<template>
  <div style="width: 315px">
    <div>
      <RightPanelButtons />
      <v-window
        v-model="RMWin"
        class="elevation-1"
        vertical
      >
        <v-window-item>
          <Calendar/>
        </v-window-item>
        <v-window-item>
          <Calculator/>
        </v-window-item>
        <v-window-item>
          <Currency/>
        </v-window-item>
        <v-window-item>
          <store/>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<script>
import RightPanelButtons from '@/components/RightBar/rightBarPanelButtons'
import Calendar from '@/components/RightBar/Calendar'
import Calculator from '@/components/RightBar/Calculator'
import Currency from '@/components/RightBar/Currency'
import store from '@/pages/views/store'
export default {
  name: 'RightBar',
  components: {
    RightPanelButtons,
    Calendar,
    Calculator,
    Currency,
    store
  },
  computed: {
    // rightBarMode(){
    //   return this.$store.getters.rightBarMode
    // },
    RMWin () {
      let RMWin = 0
      switch (this.$store.getters.rightBarMode) {
        case 'calendar':
          RMWin = 0
          break
        case 'calc':
          RMWin = 1
          break
        case 'currency':
          RMWin = 2
          break
        case 'store':
          RMWin = 3
          break
        default:
          RMWin = 0
          break
      }
      return RMWin
    }
  }
}
</script>

<style scoped>

</style>
