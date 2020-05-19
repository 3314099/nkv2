import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'
import Register from '@/pages/views/Large/guest/Register'
import Login from '@/pages/views/Large/guest/Login'
import content from '@/pages/views/content'
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
    name: 'content',
    meta: {
      layuot: 'MainLayout',
      auth: true
    },
    component: content
  },
  {
    path: '/targets',
    name: 'content',
    meta: {
      layuot: 'MainLayout',
      auth: true
    },
    component: content
  },
  {
    path: '/accounts',
    name: 'content',
    meta: {
      layuot: 'MainLayout',
      auth: true
    },
    component: content
  },
  {
    path: '/operations',
    name: 'content',
    meta: {
      layuot: 'MainLayout',
      auth: true
    },
    component: content
  },
  {
    path: '/settings',
    name: 'content',
    meta: {
      layuot: 'MainLayout',
      auth: true
    },
    component: content
  },
  {
    path: '/statistic',
    name: 'content',
    meta: {
      layuot: 'MainLayout',
      auth: true
    },
    component: content
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
