<template>
  <div>
    <v-btn
      text
      disabled: true
    >
      <h2>
        {{date | date('datetime')}}
      </h2>
    </v-btn>
  </div>
</template>
<script>
export default {
  data: () => ({
    date: new Date(),
    interva: null
  })
  // mounted: function () {
  //   this.interval = setInterval(() => {
  //     this.date = new Date()
  //   })
  // },
  // beforeDestroy () {
  //   // console.log('before Destroy')
  //   clearInterval(this.interval)
  // }
}
</script>
