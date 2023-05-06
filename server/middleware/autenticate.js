import jwt from 'jsonwebtoken'

const authRoutes = [
  '/api/posts/',
  '/api/projects/',
  '/api/skills'
]
const authMethods = ['POST', 'PUT', 'DELETE']

export default defineEventHandler(event => {
  const { method, url, headers } = event.node.req

  // const apiEndpoint = authRoutes.some(route => url.includes(route))
  const authRoutes = /\/api\/(posts|projects|skills)\//
  const authRoutesRegex = new RegExp(`^/api/(?:posts|projects|skills)(?!/like/)`)

  const validRoutes = authRoutesRegex.test(url)

  const match = url.match(authRoutes)

  console.log('match', validRoutes)

  if (validRoutes && authMethods.includes(method)) {

    const token = headers['x-access-token']

    console.log('Passou, a rota tem apiEndpoint e authMethods.includes')

    console.log('token', token)

    if (token) {
      console.log('tem token')

      try {
        jwt.verify(token, process.env.SUPABASE_JWT_SECRET, (error, decoded) => {
          console.log('verify', error)
          if (error) return setResponseStatus(event, 401, 'Invalid Token')

          event.tokenDecoded = decoded
        })
      } catch (error) {
        console.log('verify catch', error)
      }
    } else {
      console.log('nao tem token')
      event.tokenDecoded = false
      return setResponseStatus(event, 401, 'Token not provide')
    }
  }
})
