import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import VueClipboard from 'vue-clipboard2'
import dateFilter from '@/filters/date.filter'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

export const eventEmitter = new Vue()

Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.filter('date', dateFilter)

Vue.filter('visibility', (value, boolean) => {
  let string = '*'
  if (!boolean) {
    for (let i = value.length; i >= 0; i--) {
      string = string + '*'
    }
    return string
  } else {
    return value
  }
})
Vue.filter('countAccounts', (lmBtnId, accounts) => {
  let count = 0
  let checkedCount = 0
  for (var i = accounts.length - 1; i >= 0; --i) {
    if (lmBtnId % 100 === 0 && accounts[i].categoryTypeAccount.toString()[0] === lmBtnId.toString()[0]) {
      count++
      if (accounts[i].checked) {
        checkedCount++
      }
    } else if (accounts[i].categoryTypeAccount === lmBtnId) {
      count++
      if (accounts[i].checked) {
        checkedCount++
      }
    } else if (lmBtnId === 0) {
      count++
      if (accounts[i].checked) {
        checkedCount++
      }
    }
  }
  return checkedCount + '/' + count
})
Vue.filter('toUpperCase', (text) => {
  return text.toString().toUpperCase()
})
Vue.filter('capitalize', (text) => {
  text.toLowerCase()
  return text[0].toString().toUpperCase() + text.slice(1)
})

firebase.initializeApp({
  apiKey: 'AIzaSyBUlLp4YnIlvM5v61SqveOAnLPUJdkwnJk',
  authDomain: 'nkcrm-6d153.firebaseapp.com',
  databaseURL: 'https://nkcrm-6d153.firebaseio.com',
  projectId: 'nkcrm-6d153',
  storageBucket: 'nkcrm-6d153.appspot.com',
  messagingSenderId: '44220395887',
  appId: '1:44220395887:Large:7531331810f16e02c8789a',
  measurementId: 'G-7ZRBPQBQ3S'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      store,
      vuetify,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
