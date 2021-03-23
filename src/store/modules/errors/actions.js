export default {
  clearErrorsStore (context, payload) {
    context.commit('CLEAR_ERRORS_STORE', payload)
  },
  changeErrors (context, payload) {
    context.commit('CHANGE_ERRORS', payload)
  }
}
