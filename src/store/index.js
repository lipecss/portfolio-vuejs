import Vue from 'vue'
import Vuex from 'vuex'

// Plugins
import createPersistedState from 'vuex-persistedstate'

// Modules
import ModuleUser from './modules/user'
import ModulePost from './modules/posts'
import ModuleLike from './modules/likes'

Vue.use(Vuex)

const modules = {
  ModuleUser,
  ModulePost,
  ModuleLike
}

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  modules
})
