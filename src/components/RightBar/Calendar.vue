<template>
  <!-- <v-row justify="space-between"> -->
  <div>
    <!-- <div class="subheading">Defined by function</div> -->
    <v-card outlined>
      <v-date-picker
        class="d-flex flex-grow-1"
        v-model="date2"
        :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
        :events="functionEvents"
        first-day-of-week="1"
        locale="ru"
        :scrollable= "scrollable"
        :show-week= "showweek"
      ></v-date-picker>
    </v-card>
  </div>
  <!-- </v-row> -->
</template>

<script>
export default {
  data: () => ({
    arrayEvents: null,
    date1: new Date().toISOString().substr(0, 10),
    date2: new Date().toISOString().substr(0, 10),
    scrollable: true,
    showweek: true
  }),

  mounted () {
    this.arrayEvents = [...Array(6)].map(() => {
      const day = Math.floor(Math.random() * 30)
      const d = new Date()
      d.setDate(day)
      return d.toISOString().substr(0, 10)
    })
  },
  methods: {
    functionEvents (date) {
      const [,, day] = date.split('-')
      if ([12, 17, 28].includes(parseInt(day, 10))) return true
      if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
      return false
    }
  }
}
</script>
