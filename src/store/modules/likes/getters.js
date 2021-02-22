export default {
  getLikeById: (state) => (id) => {
    const like = state.likedList.find(item => item === id)

    return !like ? null : like
  }
}
