export default defineNuxtRouteMiddleware(async ({ app, redirect }) => {
  const user = useSupabaseUser()
  const router = useRouter()

  const client = useSupabaseAuthClient()
  const { data } = await client.auth.getUser()

  watchEffect(async () => {
    if (!data.user) {
      router.push('/login')
    }
  })
})
