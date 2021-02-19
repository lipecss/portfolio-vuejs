export default {
  'AUTH_USER' (state, userData) {
    state.user = {
      auth: userData.token,
      email: userData.data.email,
      username: userData.data.username
    }
  },
  'UPDATE_TOKEN' (state, userData) {
    state.user.auth = userData
  },
  'LOGOUT' (state) {
    state.user = {}
  }
}
