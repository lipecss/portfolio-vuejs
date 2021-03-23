<template>
  <b-container fluid class="page-login">
    <TheBackToHome/>
    <BaseAlerts :propClearAlert="hasError" :propTypeAlert="typeAlert" @alert-is-close="changeHasAlert('alertFalse', $event)" />
    <b-row class="row page-login___row">
      <b-col xs="12" xm="10" offset-sm="1" md="10" offset-md="1" lg="8" offset-lg="2">
        <div class="page-login___row-content">
          <div class="page-login___content">
          <div class="page-login___content-form">
              <h4 class="page-login___content-form-title">{{ $t('pages.website.loginPage.title') }}</h4>
              <h1 class="page-login___content-form-subtitle">{{ $t('pages.website.loginPage.subtitle') }}</h1>
              <form
              @submit.prevent="loginEvent"
              >
                <label for="email">
                  <input id="email" v-model="email" type="email"  name="email" :placeholder="$t('inputs.email.placeholder')" required autocomplete="new-password" :disabled="blockUi">
                </label>

                <label for="password">
                  <input v-model="userPassword" type="password" name="name" id="input-password" :placeholder="$t('inputs.password.placeholder')" :disabled="blockUi">
                </label>
                <button type="submit" value="submit" name="submit">{{ $t('buttons.signIn') }}</button>
              </form>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'
import { authenticate } from '../../services/api'

export default {
  name: 'LoginPage',
  metaInfo () {
    return {
      title: this.$t('pages.website.loginPage.html.title'),
      link: [
        { rel: 'canonical', href: `${process.env.VUE_APP_BASE}/` }
      ]
    }
  },
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
      userPassword: '',
      typeAlert: 'error',
      hasError: false
    }
  },
  components: {
    TheBackToHome: () => import('@/components/layout/TheBackToHome'),
    BaseAlerts: () => import('@/components/fragments/BaseAlerts')
  },
  computed: {},
  methods: {
    ...mapActions('ModuleUser', ['authUser']),
    async loginEvent () {
      const email = this.email
      const userPassord = this.userPassword

      const user = await authenticate(email, userPassord)

      if (user.status === 'error') {
        this.setErrors([this.$t('messages.login.error')])
        this.setBlockUi(true)
        this.hasError = true
      } else {
        this.authUser(user)
        this.$router.push({ name: 'DashBoardPage', params: { user } })
      }
    },
    changeHasAlert (refValue, eventValue) {
      if (refValue === 'alertFalse') {
        this.hasError = eventValue
      }
    }
  },
  filters: {},
  watch: {}
}
</script>

<style scoped lang="scss">
.page-login {
  background: $default-gray;

  .page-login___row {
    height: 95vh;
    min-height: 570px;
    display: flex;
    align-items: center;
    position: relative;
    display: flex;
  }

  .page-login___row-content {
    position: relative;

    .page-login___content {
      position: relative;
      min-height: 300px;
      max-height: 300px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;

      .page-login___content-form {
        padding-top: 30px;
        padding-left: 25px;
        padding-right: 25px;
        width: 100%;

        .page-login___content-form-title {
          font-size: 20px;
          margin-bottom: 8px;
          color: #fff;
          font-weight: 700;
        }

        .page-login___content-form-subtitle {
          font-size: 40px;
          margin-bottom: 8px;
          color: $default-green;
          font-weight: 700;
        }
        form {
          display: grid;
          width: 100%;

          input {
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
            letter-spacing: 0.1px;
            transition: 0.8s;
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
            transition: 0.3s;

            &:hover {
              background: transparent;
              color: $vue-green;
              box-shadow: 0 10px 15px 0 rgb(0 0 0 / 10%);
              transform: translateY(-5px);
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 375px) {}
  @media screen and (min-width: 425px) {}
  @media screen and (min-width: 576px) {}
  @media screen and (min-width: 768px) {
  }
  @media screen and (min-width: 1024px) {

    .page-login___row {
      height: 85vh;
    }

    .page-login___row-content {
      position: relative;

      .page-login___content {
        .page-login___content-form {

          .page-login___content-form-title {
            font-size: 25px;
          }

          .page-login___content-form-subtitle {
            font-size: 60px;
          }
        }
      }
    }
  }
  @media screen and (min-width: 1400px) {

    .page-login___row-content {
      position: relative;

      .page-login___content {
        .page-login___content-form {
          width: 60%;
        }
      }
    }
  }

  @media screen and (min-width: 1600px) {
    height: 100vh;
    max-height: 876px;
  }
}
</style>
