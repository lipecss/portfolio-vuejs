export default {
  async setProjectList (context, payload) {
    context.commit('SET_LIST', payload)
  },
  async pushToProjectList (context, payload) {
    context.commit('PUSH_TO_LIST', payload)
  },
  async removeToProjectList (context, payload) {
    context.commit('REMOVE_TO_LIST', payload)
  },
  async updateToProjectList (context, payload) {
    context.commit('UPDATE_TO_LIST', payload)
  }
}
