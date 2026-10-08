export default defineNuxtRouteMiddleware(async () => {
  const client = useSupabaseClient()
  const { data } = await client.auth.getUser()

  if (data.user) {
    return navigateTo('/dashboard')
  }
})
