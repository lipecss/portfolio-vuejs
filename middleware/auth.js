export default defineNuxtRouteMiddleware(async () => {
  const router = useRouter()

  const client = useSupabaseAuthClient()
  const { data } = await client.auth.getUser()

  if (!data.user) {
    return router.push('/login')
  }
})
