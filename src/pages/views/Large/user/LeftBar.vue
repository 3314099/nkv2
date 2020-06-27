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
          <LBselFPCatGroup/>
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
import LBselFPCatGroup from '@/components/FinPlan/Categories/LBselFPCatGroup'
export default {
  name: 'LeftBar',
  components: {
    leftPanelButtons,
    LBselFPCatGroup
  },
  computed: {
    leftBarMode () {
      const itemMode = this.$store.getters.itemMode
      let leftBarMode = ''
      switch (itemMode) {
        case 'FPcategoryCreate':
          leftBarMode = 'selFPCatGroups'
          break
        case 'FPcategoryEdit':
          leftBarMode = 'selFPCatGroups'
          break
        default:
          leftBarMode = ''
          break
      }
      this.$store.dispatch('chgLbMode', leftBarMode)
      return leftBarMode
    },
    LMWinMode () {
      let LMWinMode = 0
      switch (this.leftBarMode) {
        case 'calendar':
          LMWinMode = 0
          break
        case 'selFPCatGroups':
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
