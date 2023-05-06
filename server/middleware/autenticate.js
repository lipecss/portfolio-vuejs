import jwt from 'jsonwebtoken'

const authRoutes = ['/api/posts/', '/api/projects/', '/api/skills']
const authMethods = ['POST', 'PUT', 'DELETE']

export default defineEventHandler(event => {
  const { method, url, headers } = event.node.req

  const apiEndpoint = authRoutes.some(route => url.includes(route))

  if (apiEndpoint && authMethods.includes(method)) {
    const token = headers['x-access-token']

    if (token) {
      const config = useRuntimeConfig()
      const cookies = parseCookies(event)

      jwt.verify(token, process.env.SUPABASE_JWT_SECRET, (error, decoded) => {
        if (error) return setResponseStatus(event, 401, 'Invalid Token')

        event.tokenDecoded = decoded
      })
    } else {
      event.tokenDecoded = false
      return setResponseStatus(event, 401, 'Token not provide')
    }
  }
})
