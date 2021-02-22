export default {
  'SET_LIST' (state, payload) {
    state.postList = payload
  },
  'PUSH_TO_LIST' (state, payload) {
    state.postList.push(payload)
  },
  'REMOVE_TO_LIST' (state, payload) {
    state.postList.splice(payload, 1)
  },
  'UPDATE_TO_LIST' (state, payload) {
    const item = state.postList.find(item => item._id === payload)
    if (item) state.postList = item
  }
}
