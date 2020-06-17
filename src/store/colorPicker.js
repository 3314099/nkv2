export default {
  state: {
    colorPicker: '#039BE5',
    colorsArray: [
      { color: '#039BE5', childColor: '#E1F5FE' },
      { color: '#D81B60', childColor: '#F8BBD0' },
      { color: '#00897B', childColor: '#B2DFDB' },
      { color: '#F4511E', childColor: '#FFCCBC' },
      { color: '#8E24AA', childColor: '#E1BEE7' },
      { color: '#37474F', childColor: '#90A4AE' },
      { color: '#B71C1C', childColor: '#EF5350' },
      { color: '#880E4F', childColor: '#EC407A' },
      { color: '#4A148C', childColor: '#AB47BC' },
      { color: '#673AB7', childColor: '#7E57C2' },
      { color: '#1A237E', childColor: '#5C6BC0' },
      { color: '#0D47A1', childColor: '#42A5F5' },
      { color: '#01579B', childColor: '#29B6F6' },
      { color: '#006064', childColor: '#26C6DA' },
      { color: '#004D40', childColor: '#26A69A' },
      { color: '#1B5E20', childColor: '#66BB6A' },
      { color: '#33691E', childColor: '#9CCC65' },
      { color: '#827717', childColor: '#D4E157' },
      { color: '#F57F17', childColor: '#FFEE58' },
      { color: '#FF6F00', childColor: '#FFCA28' },
      { color: '#E65100', childColor: '#FFA726' },
      { color: '#BF360C', childColor: '#FF7043' },
      { color: '#4E342E', childColor: '#BCAAA4' }
    ]
  },
  mutations: {
    colorPicker (state, colorPicker) {
      state.colorPicker = colorPicker
    }
  },
  actions: {
    colorPicker ({ commit }, colorPicker) {
      commit('colorPicker', colorPicker)
    }
  },
  getters: {
    colorsArray (state) {
      return state.colorsArray
    },
    colorPicker (state) {
      return state.colorPicker
    }
  }
}
