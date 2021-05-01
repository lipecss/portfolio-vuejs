import Vue from 'vue'
import Vuex from 'vuex'

// Plugins
import createPersistedState from 'vuex-persistedstate'

import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// Modules
import ModuleUser from './modules/user'
import ModulePost from './modules/posts'
import ModuleProject from './modules/projects'
import ModuleLike from './modules/likes'
import ModuleErrors from './modules/errors'

Vue.use(Vuex)

const modules = {
  ModuleUser,
  ModulePost,
  ModuleProject,
  ModuleLike,
  ModuleErrors
}

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state,
  actions,
  mutations,
  getters,
  modules
})
