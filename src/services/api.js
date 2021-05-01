import axios from 'axios'
import { hasTokenInStore } from '../helpers/functions'

const apiBase = process.env.VUE_APP_API

const api = axios.create({
  baseURL: apiBase,
  headers: { 'Access-Control-Allow-Origin': '*' }
})

// async function getDefaultHeaders () {
//   const token = await hasTokenInStore()

//   return {
//     'Content-Type': 'application/json',
//     'x-access-token': token
//   }
// }

// USER
export async function authenticate (email, password) {
  return api.post('/users/authenticate', { email, password }).then(response => {
    return response.data
  }).catch(error => {
    return {
      status: 'error',
      data: error.response.data
    }
  })
}

export async function refreshToken (token) {
  return api.post('/users/refresh-token', { token }).then(response => {
    return response.data
  }).catch(error => {
    return {
      status: 'error',
      data: error.response.data
    }
  })
}

// POSTS

// Pega todas os Pots sem paginação
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

export async function newPost (img, title, content) {
  const token = await hasTokenInStore()

  return api.post('/posts', { img, title, content },
    {
      headers: {
        'x-access-token': token
      }
    }).then(response => {
    return response.data
  }).catch(error => {
    return {
      status: 'error',
      data: error
    }
  })
}

export async function editPost (_id, img, title, content) {
  const token = await hasTokenInStore()

  return api.put(`/posts/${_id}`, { img, title, content },
    {
      headers: {
        'x-access-token': token
      }
    }).then(response => {
    return response.data
  }).catch(error => {
    return {
      status: 'error',
      data: error
    }
  })
}

export async function deletePost (id) {
  const token = await hasTokenInStore()
  return api.delete(`/posts/${id}`,
    {
      headers: {
        'x-access-token': token
      }
    }).then(response => {
    return response.data
  }).catch(error => {
    return {
      status: 'error',
      data: error
    }
  })
}

export async function likePost (id, action) {
  return api.post(`/like/${id}`, { action }).then(response => {
    return response.data
  }).catch(error => {
    return {
      status: 'error',
      data: error
    }
  })
}

export async function contactMe (name, from, subject, message) {
  return api.post('/contact', { name, from, subject, message }).then(response => {
    return response.data
  }).catch(error => {
    return {
      status: 'error',
      data: error
    }
  })
}

// PROJECTS

// Pega todas os Pots sem paginação
export async function getProjects () {
  return api.get('/projects').then(response => {
    return response.data
  }).catch(error => {
    return {
      status: 'error',
      data: error
    }
  })
}

export async function newProject (name, description, images, skills) {
  const token = await hasTokenInStore()

  return api.post('/projects', { name, description, images, skills },
    {
      headers: {
        'x-access-token': token
      }
    }).then(response => {
    return response.data
  }).catch(error => {
    return {
      status: 'error',
      data: error
    }
  })
}

export async function deleteProject (id) {
  const token = await hasTokenInStore()
  return api.delete(`/projects/${id}`,
    {
      headers: {
        'x-access-token': token
      }
    }).then(response => {
    return response.data
  }).catch(error => {
    return {
      status: 'error',
      data: error
    }
  })
}

export async function editProject (_id, img, title, content) {
  const token = await hasTokenInStore()

  return api.put(`/posts/${_id}`, { img, title, content },
    {
      headers: {
        'x-access-token': token
      }
    }).then(response => {
    return response.data
  }).catch(error => {
    return {
      status: 'error',
      data: error
    }
  })
}

export async function getProjectsBySlug (slug) {
  return api.get(`/project/${slug}`).then(response => {
    return response.data
  }).catch(error => {
    return {
      status: 'error',
      data: error
    }
  })
}

export async function getLatestProject () {
  return api.get('/project/latest').then(response => {
    return response.data
  }).catch(error => {
    return {
      status: 'error',
      data: error
    }
  })
}

// SIKILLS

export async function getSkills () {
  return api.get('/skills').then(response => {
    return response.data
  }).catch(error => {
    return {
      status: 'error',
      data: error
    }
  })
}
