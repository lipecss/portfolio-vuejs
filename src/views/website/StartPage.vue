<template>
  <div class="start">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
const NavBar = () => import('@/components/layout/TheNavBar')
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
    NavBar
  },
  computed: {},
  methods: {},
  filters: {},
  watch: {}
}
</script>

<style lang="scss">

</style>
