<template>
  <div class="start">
    <NavBar/>
    <transition name="router-transition" mode="out-in">
      <router-view/>
    </transition>
    <TheBackToTop/>
  </div>
</template>

<script>
const NavBar = () => import('@/components/layout/TheNavBar')
const TheBackToTop = () => import('@/components/layout/TheBackToTop')
export default {
  name: 'StartPage',
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  data () {
    return {}
  },
  components: {
    NavBar,
    TheBackToTop
  },
  computed: {},
  methods: {},
  filters: {},
  watch: {}
}
</script>

<style lang="scss">
.start {
  min-height: 805px;
}

// Transição de rota

.router-transition-enter,
.router-transition-leave-to {
  opacity: 0;
  transform: translateX(2em);
}

.router-transition-enter-active,
.router-transition-leave-active {
  transition: all .8s ease-in-out;
}
</style>
