<template>
  <div class="login">
    <h1>Login Page View</h1>

    <input id="email" v-model="email" type="email"  name="email" placeholder="Your Email" required autocomplete="new-password">
    <input v-model="userPassword" type="password" name="name" id="input-password" placeholder="Senha" @keyup.enter="loginEvent" >

    <button @click.prevent="loginEvent">Submit</button>
    <p><router-link :to="{ path: '/' }">Esqueci minha senha</router-link></p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { authenticate } from '../../services/api'

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
      email: '',
      userPassword: ''
    }
  },
  components: {},
  computed: {},
  methods: {
    ...mapActions('ModuleUser', ['authUser']),
    async loginEvent () {
      const email = this.email
      const userPassord = this.userPassword

      authenticate(email, userPassord).then(user => {
        this.authUser(user)
        this.$router.push({ name: 'DashBoardPage', params: { user } })
      })
    }
  },
  filters: {},
  watch: {}
}
</script>

<style scoped lang="scss">
</style>
