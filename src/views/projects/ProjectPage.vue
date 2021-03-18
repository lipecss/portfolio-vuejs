<template>
  <div class="posts">
    <TheBackToHome/>

    <b-container>
      <b-row class="content">
        <b-col cols="12">
         {{ project.name }}
          <div v-for="(img, index) in project.images" :key="index" >
            <img :src="img" alt="">
          </div>
        </b-col>
      </b-row>
    </b-container>

    <BaseAlternativeFooter />
  </div>
</template>

<script>
export default {
  name: 'BlogPage',
  metaInfo () {
    return {
      title: this.project.name,
      meta: [
        { name: 'description', content: this.project.description },
        { name: 'keywords', content: this.project.slug },
        { property: 'og:image', content: this.project.images[0] }
      ],
      link: [
        { rel: 'canonical', href: `${process.env.VUE_APP_BASE}/` }
      ]
    }
  },
  beforeCreate () {},
  created () {
    this.project = this.$route.params.project
    console.log(this.$route.params.project)
  },
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  data () {
    return {
      project: []
    }
  },
  components: {
    TheBackToHome: () => import('@/components/layout/TheBackToHome'),
    BaseAlternativeFooter: () => import('@/components/layout/BaseAlternativeFooter')
  },
  computed: {},
  methods: {},
  filters: {},
  watch: {}
}
</script>

<style lang="scss">
.posts {
  min-height: 805px;
  background: #fff;
}

.content {
  padding: 50px 0;
}
</style>
