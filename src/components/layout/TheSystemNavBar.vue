<template>
  <b-navbar toggleable="lg" :sticky=true class="mb-5">
    <router-link class="navss" :to="{ name: 'HomePage'}" target="_blank">
      {{ $t('components.layout.theNavBar.navContent[0].name') }}
    </router-link>
    <button class="login ml-auto" @click="logoutUser">{{ $t('buttons.logout') }}</button>
  </b-navbar>
</template>

<script>
export default {
  name: 'TheSystemNavBar',
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  destroyed () {},
  data () {
    return {}
  },
  props: {},
  computed: {},
  methods: {
    logoutUser () {
      this.$emit('logout', true)
    }
  },
  filters: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.navbar {
  top: 0;
  z-index: 999;
  background-color: #000;
  border: none;
  list-style: none;
  width: 100%;
}

.navss {
  margin: 0 15px;
  color: #fff !important;
  text-align: center;
  font-size: 16px;
  font-weight: 600;

  &:hover {
    color: $vue-green !important;
  }
}

ul {
  display: flex;
  align-items: center;
}

.current {
  border-bottom: solid 5px $vue-green;
  transition: border-width 0.6s linear;
  // width: 106px;
}

.login {
  padding: 0 23px;
  height: 40px;
  line-height: 34px;
  border: 2px solid $red;
  background: transparent;
  border-radius: 4px;
  font-size: 14px;
  text-transform: uppercase;
  transition: .3s;
  color: $red;

  &:hover {
    background: $red;
    color: #fff;
    box-shadow: 0 10px 15px 0 rgb(0 0 0 / 10%);
    transform: translateY(-5px);
    a {
      color: #fff;
    }
  }
}
</style>
