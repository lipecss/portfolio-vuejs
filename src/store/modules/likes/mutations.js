export default {
  'SET_LIST' (state, payload) {
    state.likedList = payload
  },
  'PUSH_TO_LIST' (state, payload) {
    state.likedList.push(payload)
  },
  'REMOVE_TO_LIST' (state, payload) {
    const index = state.likedList.findIndex(like => like.id === payload)
    state.likedList.splice(index, 1)
  },
  'UPDATE_TO_LIST' (state, payload) {
    const list = state.likedList

    const newPost = list.map((item) => {
      if (item._id === payload._id) item = payload
      return item
    })
    state.likedList = newPost
  }
}
