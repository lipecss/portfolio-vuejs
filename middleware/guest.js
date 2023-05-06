export default defineNuxtRouteMiddleware(async () => {
  const client = useSupabaseAuthClient()
  const { data } = await client.auth.getUser()

  if (data.user) {
    return navigateTo('/dashboard')
  }
})
