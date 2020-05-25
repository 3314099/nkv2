<template>
  <div class="" style="width: 347px">
    <div>
      <leftPanelButtons />
      <v-window
        v-model="LMWin"
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
    LMWin () {
      let LMWin = 0
      switch (this.$store.getters.leftBarMode) {
        case 'calendar':
          LMWin = 0
          break
        case 'calc':
          LMWin = 1
          break
        case 'currency':
          LMWin = 2
          break
        default:
          LMWin = 0
          break
      }
      return LMWin
    }
  }
}
</script>

<style scoped>

</style>
