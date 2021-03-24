<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo () {
    const locale = this.$i18n.locale
    return {
      title: 'Home',
      titleTemplate: chunk => (
        locale === 'en' ? `${chunk} | ${process.env.VUE_APP_APP_NAME}` : `${chunk} | ${process.env.VUE_APP_APP_NAME}`
      ),
      htmlAttrs: {
        lang: 'pt-BR'
      },
      link: [
        { rel: 'canonical', href: 'https://felipecss.com' }
      ]
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
  components: {},
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
