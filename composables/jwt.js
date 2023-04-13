import jwt from 'jsonwebtoken'
const secret = 'my-super-secret'

export const useJwt = () => {

  const validToken = (token) => {
    try {
      const decoded = jwt.verify(token, secret)
      console.log('decoded', decoded)
      return decoded
    } catch (err) {
      console.log('err', err)
      return null
    }
  }

  return {
    validToken
  }
}
