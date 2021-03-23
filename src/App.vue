<template>
  <div class="app">
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
      meta: [
        { name: 'robots', content: 'index, follow' },
        { name: 'description', content: 'Esse site é meu cantinho, o lugar do Felipecss, na qual você poderá conhecer um pouco de tudo, dos meus projetos, trabalhos, gostos e de mim. Estou super ansioco para trocarmos um papo!' },
        { name: 'keywords', content: 'felipecss, felipe, vuejs, vue, javascript, developer, development, desenvolvedor' }
      ],
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
