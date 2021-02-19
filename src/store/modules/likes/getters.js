export default {
  getLikeById: (state) => (id) => {
    const like = state.likedList.find(item => item === id)
    console.log('like', like)
    return !like ? null : like
  }
}
