export default {
  authUser (context, userData) {
    context.commit('AUTH_USER', userData)
  },
  logout (context) {
    context.commit('LOGOUT')
  },
  upadateToken (context, userData) {
    context.commit('UPDATE_TOKEN', userData)
  },
  clearUserStore (context, payload) {
    context.commit('CLEAR_USER_STORE', payload)
  }
}
