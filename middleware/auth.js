export default defineNuxtRouteMiddleware(async ({ app, redirect }) => {
  const user = useSupabaseUser()
  const router = useRouter()

  const client = useSupabaseAuthClient()
  const { data } = await client.auth.getUser()

  watchEffect(async () => {
    if (!data) {
      console.log("must be redirecting to signin now");
      router.push('/login')
      // // await navigateTo({ name: "signin", query: { redirect: to.path } });
    }
  })
})
