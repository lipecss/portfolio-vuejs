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
    const list = state.postList

    const newPost = list.map((item) => {
      if (item._id === payload._id) item = payload
      return item
    })
    state.postList = newPost
  }
}
