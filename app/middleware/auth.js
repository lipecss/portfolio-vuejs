// Sem tela de login por enquanto: quem não tem sessão volta para a home.
export default defineNuxtRouteMiddleware(async () => {
  const client = useSupabaseClient()
  const { data } = await client.auth.getUser()

  if (!data.user) {
    return navigateTo('/')
  }
})
