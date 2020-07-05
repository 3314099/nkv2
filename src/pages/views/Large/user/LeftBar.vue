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
          <LBselFPTagGroup/>
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
import LBselFPTagGroup from '@/components/FinPlan/Tags/LBselFPTagGroup'
export default {
  name: 'LeftBar',
  components: {
    leftPanelButtons,
    LBselFPCatGroup,
    LBselFPTagGroup
  },
  computed: {
    leftBarMode () {
      let leftBarMode = ''
      switch (this.$store.getters.leftBarMode) {
        case 'selFPCatGroups':
          leftBarMode = 'selFPCatGroups'
          break
        case 'selFPTagGroups':
          leftBarMode = 'selFPTagGroups'
          break
        default:
          leftBarMode = ''
          break
      }
      return leftBarMode
    },
    LMWinMode () {
      let LMWinMode = 0
      switch (this.$store.getters.leftBarMode) {
        case 'calendar':
          LMWinMode = 0
          break
        case 'selFPCatGroups':
          LMWinMode = 1
          break
        case 'selFPTagGroups':
          LMWinMode = 2
          break
        case 'currency':
          LMWinMode = 3
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
