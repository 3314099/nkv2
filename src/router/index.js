import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'
import Register from '@/pages/views/Large/guest/Register'
import Login from '@/pages/views/Large/guest/Login'
import MainPage from '@/pages/views/MainPage'
import Landing from '@/pages/views/Large/guest/Landing'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layuot: 'EmptyLayout'
    },
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layuot: 'EmptyLayout',
      page: 'login'
    },
    component: Login
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      layuot: 'MainLayout',
      auth: true
    },
    component: MainPage
  },
  {
    path: '/targets',
    name: 'targets',
    meta: {
      layuot: 'MainLayout',
      auth: true
    },
    component: MainPage
  },
  {
    path: '/accounts',
    name: 'accounts',
    meta: {
      layuot: 'MainLayout',
      auth: true
    },
    component: MainPage
  },
  {
    path: '/operations',
    name: 'operations',
    meta: {
      layuot: 'MainLayout',
      auth: true
    },
    component: MainPage
  },
  {
    path: '/properties',
    name: 'properties',
    meta: {
      layuot: 'MainLayout',
      auth: true
    },
    component: MainPage
  },
  {
    path: '/statistic',
    name: 'statistic',
    meta: {
      layuot: 'MainLayout',
      auth: true
    },
    component: MainPage
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const currentUsser = firebase.auth().currentUser
  const requireAuth = to.matched.some(content => content.meta.auth)

  if (requireAuth && !currentUsser) {
    next('/login?message = login')
  } else {
    next()
  }
})
export default router
