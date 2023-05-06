<template>
  <div class="h-screen md:flex">
    <div
      class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-g1 to-g4 i justify-around items-center hidden">
      <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
    </div>

    <div class="h-full flex md:w-2/3 justify-center py-6 items-center ">
      <form @submit.prevent="handleLogin" class="md:w-2/3">
        <h1 class="font-bold text-2xl mb-1">Bem vindo ao</h1>
        <p class="font-bold text-g1 mb-7 text-4xl">Meu Site</p>
        
        <label for="email">
        <input 
          id="email"
          v-model="email"
          type="email"
          name="email"
          placeholder="Seu email"
          required
        >
      </label>

      <label for="password">
        <input 
          id="password"
          v-model="password"
          type="password"
          name="password"
          placeholder="Sua senha"
          required
          autocomplete="new-password"
        >
      </label>

      <button class="w-full" type="submit" value="submit" name="submit">Enviar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'guest'
})

const supabase = useSupabaseClient()
const router = useRouter()
const config = useRuntimeConfig()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    const { user, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
      options: {
        redirectTo: `${config.public.baseUrl}/dashboard`,
      }
    })
    if (error) throw error
    else {
      supabase.auth.refreshSession()
      useNuxtApp().$toast.success('Login efetuado com sucesso!', {
        theme: 'dark'
      })
      router.push({ path: '/dashboard' })
      //await navigateTo('/dashboard') // redireciona para /admin após o login bem-sucedido
    }
  } catch (error) {
    useNuxtApp().$toast.error('Falha ao logar. Tente novamente!', {
      theme: 'dark'
    })
  }
}

</script>

<style lang="scss" scoped>
label {
  display: block;
}

input, textarea {
  display: block;
  width: 100%;
  padding: 0 20px;
  background: transparent;
  border: 1px solid #c6c9d8;
  border-radius: 5px;
  height: 50px;
  line-height: 46px;
  margin-bottom: 20px;
  outline: none;
  color: #42b883;
  font-size: 15px;
  letter-spacing: .1px;
  transition: 0.8s;

  &:focus {
    border-color: #42b883;
  }
}

textarea {
  margin-top: 0px;
  margin-bottom: 20px;
  height: 153px;
  resize: none;
}

button {
  background: #42b883;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 15px 40px;
  border: 2px solid #42b883;
  border-radius: 6px;
  display: inline-block;
  font-weight: 500;
  transition: .3s;

  &:hover {
    background: transparent;
    color: #42b883;
    box-shadow: 0 10px 15px 0 rgb(0 0 0 / 10%);
    transform: translateY(-5px);
  }
}
</style>
