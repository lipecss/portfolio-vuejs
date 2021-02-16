<template>
  <div class="login">
    <h1>Login Page View</h1>

    <input v-model.trim="userName" type="text" name="name" id="input-name" placeholder="Nome" @keyup.enter="loginEvent" >
    <input v-model="userPassword" type="password" name="name" id="input-password" placeholder="Senha" @keyup.enter="loginEvent" >

    <button @click.prevent="loginEvent">Submit</button>
    <p><router-link :to="{ name: 'ForgotPassword' }">Esqueci minha senha</router-link></p>
  </div>
</template>

<script>

export default {
  name: 'LoginPage',
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  data () {
    return {
      userName: '',
      userPassword: ''
    }
  },
  components: {},
  computed: {},
  methods: {
    loginEvent () {
      const userName = this.userName
      const userPassord = this.userPassword

      if (userName && userPassord) {
        alert(`Nome: ${userName} - Senha: ${userPassord}`)
      } else if (!userName && !userPassord) {
        alert('Informe um nome de usuario e Senha')
      } else if (!userName) {
        alert('Informe um nome de usuario')
      } else if (!userPassord) {
        alert('Informe uma senha')
      }

      // localStorage.setItem('system_user_type', 'client')
      // localStorage.setItem('system_token', 'asdasdasdasdasdas')

      if (this.userType === 'admin') {
        this.$router.push({ name: 'AdminDashboardPage' })
      } else if (this.userType === 'client') {
        this.$router.push({ name: 'UserDashboardPage' })
      } else {
        this.$router.push({ name: 'HomePage' })
      }
    }
  },
  filters: {},
  watch: {}
}
</script>

<style scoped lang="scss">
</style>
