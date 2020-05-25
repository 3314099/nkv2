<template>
  <v-card>
    <div class="row">
      <v-col cols="6" >
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            locale="ru"
            v-model="date"
            no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="6">
        <v-select
          class="ma"
          v-model="type"
          :items="types"
        ></v-select>
      </v-col>
    </div>
    <v-col
      cols="12"
    >
      <v-btn-toggle
        v-model="toggle_exclusive"
        mandatory
      >
        <v-btn
          @click="changeCalendar"
        >
          RUR
        </v-btn>
        <v-btn
          @click="changeCalculator"
        >
          USD
        </v-btn>
        <v-btn
          @click="changeCurrency"
        >
          EUR
        </v-btn>
        <v-btn
          @click="changeCalculator"
        >
          {{date}}
        </v-btn>
      </v-btn-toggle>
    </v-col>
  </v-card>
</template>

<script>
export default {
  name: 'Currancy',
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    types: [
      'ЦБ РФ',
      'Forex'
    ],
    type: 'ЦБ РФ',
    mandatory: false,
    multiple: true,
    dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana'],
    toggle_exclusive: 2
  }),
  methods: {
    changeCalendar () { },
    changeCalculator () { },
    changeCurrency () { }
  }
}
</script>

<style>
  .ma {
    margin-right: 5px;
  }

</style>
