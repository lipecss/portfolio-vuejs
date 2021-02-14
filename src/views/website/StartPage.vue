<template>
  <div class="start">
    <NavBar/>
    <router-view/>
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
    return {
      result: 'OI'
    }
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

</style>
