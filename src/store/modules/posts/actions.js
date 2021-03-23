export default {
  async setList (context, payload) {
    context.commit('SET_LIST', payload)
  },
  async pushToList (context, payload) {
    context.commit('PUSH_TO_LIST', payload)
  },
  async removeToList (context, payload) {
    context.commit('REMOVE_TO_LIST', payload)
  },
  async updateToList (context, payload) {
    context.commit('UPDATE_TO_LIST', payload)
  }
}
