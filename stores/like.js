import { defineStore } from 'pinia'

export const likeStore = defineStore('like-store', {
  state: () => {
    return {
      likedList: []
    }
  },
  actions: {
    setList(payload) {
      this.likedList = payload
    },
    pushToList(payload) {
      this.likedList.push(payload)
    },
    removeToList(payload) {
      const index = this.likedList.findIndex(like => like === payload)

      if (index !== -1) this.likedList.splice(index, 1)

    },
    updateToList(state, payload) {
      const list = state.likedList

      const newPost = list.map((item) => {
        if (item._id === payload._id) item = payload
        return item
      })

      this.likedList = newPost
    }
  },
  getters: {
    getLikeById: (state) => (id) => {
      const like = state.likedList.find(item => item === id)

      return !like ? null : like
    }
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: 'strict'
    })
  }
})
