export default {
  'CLEAR_ERRORS_STORE' (state, payload) {
    state.errors = []
  },
  'CHANGE_ERRORS' (state, payload) {
    state.errors = payload
  }
}
