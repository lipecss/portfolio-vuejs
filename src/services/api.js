import axios from 'axios'

const apiBase = process.env.VUE_APP_API

const api = axios.create({
  baseURL: apiBase,
  headers: { 'Access-Control-Allow-Origin': '*' }
})

function getDefaultHeaders () {
  return {
    'Content-Type': 'application/json',
    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMjg5MzkzZDhhYjgwMmE2NDgwOTExZiIsImVtYWlsIjoiZmVsaXBlY3NzQHZlbWxhdmFyYWxvdWNhLmNvbS5iciIsInVzZXJuYW1lIjoiRmVsaXBlY3NzIiwiaWF0IjoxNjEzMzkwMTMzLCJleHAiOjE2MTM0NzY1MzN9.x1cIiXcObg_vbNn6RIriRDtwcI-52e39WzssoEOprZY'
  }
}

// Pega todas as urls do usuario pelo Id
export async function getPosts () {
  return api.get('/posts').then(response => {
    return response.data
  }).catch(error => {
    return {
      status: 'error',
      data: error
    }
  })
}

export async function getPostsBySlug (slug) {
  return api.get(`/posts/${slug}`).then(response => {
    return response.data
  }).catch(error => {
    return {
      status: 'error',
      data: error
    }
  })
}

export async function getLatestPost () {
  return api.get('/posts/latest').then(response => {
    return response.data
  }).catch(error => {
    return {
      status: 'error',
      data: error
    }
  })
}

export async function newPost (postImage, title, content) {
  return api.post('/posts', { postImage, title, content }, { headers: getDefaultHeaders() }).then(response => {
    return response.data
  }).catch(error => {
    return {
      status: 'error',
      data: error
    }
  })
}
