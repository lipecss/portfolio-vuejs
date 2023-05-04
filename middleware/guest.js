export default defineNuxtRouteMiddleware(async (to, _from) => {
  const client = useSupabaseAuthClient()
  const { data } = await client.auth.getUser()

  console.log('user', data.user)
  if (data.user) {
    return navigateTo('/dashboard')
  }
})
