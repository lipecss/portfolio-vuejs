<template>
  <div class="start">
    <transition name="router-transition" mode="out-in">
      <router-view/>
    </transition>
    <Footer/>
  </div>
</template>

<script>

export default {
  name: 'StartPage',
  metaInfo () {
    return {
      meta: [
        { vmid: 'description', name: 'description', content: 'Esse site é meu cantinho, o lugar do Felipecss, na qual você poderá conhecer um pouco de tudo, dos meus projetos, trabalhos, gostos e de mim. Estou super ansioco para trocarmos um papo!' },
        { vmid: 'keywords', name: 'keywords', content: 'felipecss, felipe, vuejs, vue, javascript, developer, development, desenvolvedor' }
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
    return {}
  },
  components: {
    Footer: () => import('@/components/layout/TheFooter')
  },
  computed: {},
  methods: {},
  filters: {},
  watch: {}
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;

}
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
