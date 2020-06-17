export default {
  methods: {
    UfilterByType (array, field, val) { // создает новый массив объектов с учетом свойства объекта и заначения
      return [...array].filter(o => o[field] === val)
    },
    UsearchField () {
      return this.$store.getters.searchField
    },
    UarrayFromObjectsArrayByField (array, field) { // создает массив из свойства объектов
      if (array.length) {
        return array.map(item => item[field])
      } else {
        return []
      }
    },
    UsortFromObjectsArrayByArray (ObjectsArray, Array, field) {
      const newArray = []
      if (Array.length) {
        Array.forEach((item) => {
          const newItem = ObjectsArray.find(objectsItem => objectsItem[field] === item)
          if (newItem) {
            newArray.push(newItem)
          }
        })
        return newArray
      } else {
        return []
      }
    },
    UsortObjectsArray (array, field, reverse = false) {
      if (reverse) {
        return [...array].sort((a, b) => a[field] > b[field] ? 1 : -1).reverse()
      } else {
        return [...array].sort((a, b) => a[field] > b[field] ? 1 : -1)
      }
    },
    UsortRuEnArray (arr, val) {
      if (!val) {
        return arr
      } else {
        const newArr = arr.filter((item) => {
          return ((item.title.toLowerCase()).includes(this.translate(val).ru.toLowerCase()) ||
            (item.title.toLowerCase()).includes(this.translate(val).en.toLowerCase()))
        })
        return newArr
      }
    },
    translate (val) {
      const translate = {
        ru: '',
        en: ''
      }
      const ruLits = ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю']
      const enLits = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.']
      for (let i = 0; i < val.length; i++) {
        const ruIdx = ruLits.indexOf(val[i].toLowerCase())
        const enIdx = enLits.indexOf(val[i].toLowerCase())
        if (ruIdx >= 0) {
          translate.ru = translate.ru + ruLits[ruIdx]
          translate.en = translate.en + enLits[ruIdx]
        } else if (enIdx >= 0) {
          translate.ru = translate.ru + ruLits[enIdx]
          translate.en = translate.en + enLits[enIdx]
        } else {
          translate.ru = translate.ru + val[i]
          translate.en = translate.en + val[i]
        }
      }
      return translate
    }
  }
}
