import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from '@router/routes.js'

import { hasTokenInStore, validToken } from '../helpers/functions'
import store from '../store/index'

Vue.use(VueRouter)

const scrollBehavior = (to, from, savedPosition) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ x: 0, y: 0 })
    }, 500)
  })
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  scrollBehavior,
  routes
})

// Proteção das rotas (Auth)
router.beforeEach(async (to, from, next) => {
  // Obtendo se ja existe token salvo localmente
  const tokenLocalStorage = await hasTokenInStore()

  // Meta da rota
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // Verifica se token é valido e refresh se for
  if (tokenLocalStorage) {
    var tokeIsValid = await validToken(tokenLocalStorage)

    if (!tokeIsValid && requiresAuth) {
      next({ name: 'LoginPage' })
    }
  }

  if (requiresAuth && !tokenLocalStorage) {
    next({ name: 'LoginPage' })
  } else if (tokeIsValid && to.path === '/login') {
    next({ name: 'DashBoardPage' })
  } else if (requiresAuth && tokenLocalStorage) {
    if (!tokeIsValid.auth) {
      store.commit('ModuleUser/UPDATE_TOKEN', tokeIsValid.token)
      next()
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
