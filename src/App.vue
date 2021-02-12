<template>
  <div class="app">
    <NavBar/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
const NavBar = () => import('@/components/layout/TheNavBar')
const Footer = () => import('@/components/layout/TheFooter')

export default {
  components: {
    NavBar,
    Footer
  }
}

</script>
<style lang="scss">
.app {
  height: 1600px;
}
#router-view {
  padding: 20px 0px;
  margin: 0 auto;
}
</style>
