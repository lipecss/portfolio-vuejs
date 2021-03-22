import store from '../store/index'
import { refreshToken } from '../services/api'

// Verifica se existe ja token na Store
export const hasTokenInStore = async () => {
  const token = store.state.ModuleUser.user.auth
  if (token) return token
  return false
}

// Autentica o usuario
export const validToken = async (token) => {
  const result = await refreshToken(token)

  return result
}

// Funcao que retorna se um objeto possui uma quantidade de propriedades
export const objectHasQuantityProperties = (obj, count) => {
  if (Object.keys(obj).length === count) return true
  return false
}

// Funcao que retorna se é um objeto
export const itIsObject = (obj) => {
  if (obj.constructor === Object) return true
  return false
}

// Funcao que retorna se é um objeto vazio
export const isEmptyObject = (obj) => {
  if (Object.entries(obj).length === 0) return true
  return false
}

// Funcao que retorna se um objeto possui keys
export const objectHasArrayKeys = (obj, keys) => {
  const objkeys = Object.keys(obj)

  if (objkeys.length && keys.length) {
    const result = objkeys.every(key => {
      return keys.includes(key)
    })

    return result
  }

  return false
}

// Funcao que retorna se é um array
export const itIsArray = (item) => {
  if (Array.isArray(item) && item.constructor === Array) return true
  return false
}
