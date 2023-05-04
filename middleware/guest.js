export default defineNuxtRouteMiddleware(async (to, _from) => {
  const client = useSupabaseAuthClient()
  const { data } = await client.auth.getUser()

  if (data.user) {
    return navigateTo('/dashboard')
  }
})
