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
