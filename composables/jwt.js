import jwt from 'jsonwebtoken'
const secret = 'my-super-secret'

export const useJwt = () => {

  const validToken = (token) => {
    try {
      const decoded = jwt.verify(token, secret)
      return decoded
    } catch (err) {
      return null
    }
  }

  return {
    validToken
  }
}
