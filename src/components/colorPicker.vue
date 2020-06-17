<template>
  <div class="pa-1">
    <v-btn-toggle
      class="d-flex d-lg-inline-flex d-md-flex"
    >
      <v-btn
        v-for="item in colorsArray"
        :key="item"
        :ripple="false"
        :color="item"
        @click="changeColorPicker(item)"
        mandatory= true
        max="0"
      >
        <div class="img img-size">
          <img
            v-if="colorPicker === item"
            src="approval64.png"
            alt="approval"
          >
        </div>
      </v-btn>

    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  name: 'colorPicker',
  props: {
    colorsIgnore: {
      type: Array
    }
  },
  computed: {
    colorsArray () {
      const colorsArray = this.$store.getters.colorsArray
        .map(item => item.color)
        .filter(x => !this.colorsIgnore.includes(x))
      if (this.editItem.color) {
        colorsArray.unshift(this.editItem.color)
        this.$store.dispatch('colorPicker', this.editItem.color)
      } else {
        this.$store.dispatch('colorPicker', colorsArray[0])
      }
      return colorsArray.slice(0, 10)
    },
    colorPicker () {
      return this.$store.getters.colorPicker
    },
    editItem () {
      return this.$store.getters.editItem
    }
  },
  methods: {
    changeColorPicker (val) {
      this.$store.dispatch('colorPicker', val)
    }
  }
}
</script>

<style scoped>

</style>
