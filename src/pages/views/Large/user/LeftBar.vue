<template>
  <div class="" style="width: 347px">
    <div>
      <leftPanelButtons />
      <v-window
        v-model="LMWinMode"
        vertical
      >
        <v-window-item>
          <h1>LeftBar1</h1>
        </v-window-item>
        <v-window-item>
          <h1>LeftBar2</h1>
        </v-window-item>
        <v-window-item>
          <h1>LeftBar3</h1>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<script>
import leftPanelButtons from '@/components/LeftBar/leftPanelButtons'
export default {
  name: 'LeftBar',
  components: {
    leftPanelButtons
  },
  computed: {
    LMWinMode () {
      let LMWinMode = 0
      switch (this.$store.getters.leftBarMode) {
        case 'calendar':
          LMWinMode = 0
          break
        case 'calc':
          LMWinMode = 1
          break
        case 'currency':
          LMWinMode = 2
          break
        default:
          LMWinMode = 0
          break
      }
      return LMWinMode
    }
  }
}
</script>

<style scoped>

</style>
