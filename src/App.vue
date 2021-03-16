<template>
  <div class="app">
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
// const NavBar = () => import('@/components/layout/TheNavBar')
const Footer = () => import('@/components/layout/TheFooter')

export default {
  name: 'App',
  metaInfo () {
    const locale = this.$i18n.locale
    return {
      title: 'Default Title',
      titleTemplate: chunk => (
        locale === 'en' ? `${chunk} | ${process.env.VUE_APP_APP_NAME}` : `${chunk} | ${process.env.VUE_APP_APP_NAME}`
      ),
      htmlAttrs: {
        lang: 'pt-BR'
      }
    }
  },
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
  components: {
    // NavBar,
    Footer
  },
  computed: {},
  methods: {},
  filters: {},
  watch: {}
}

</script>
<style lang="scss">
#router-view {
  // padding: 20px 0px;
  margin: 0 auto;
}
</style>
