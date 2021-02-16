<template>
  <div class="post">
    <BaseHeroPost :urlImg="post.img" :title="post.title" :date="post.created_at"/>
    <b-container>
      <b-row class="content">
        <b-col cols="12">
          <div v-html-safe="post.content" class="innerhtml"></div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

const BaseHeroPost = () => import('@/components/fragments/BaseHeroPost')
export default {
  name: 'BlogPage',
  beforeCreate () {},
  created () {
    this.post = this.$route.params.post
  },
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  data () {
    return {
      post: []
    }
  },
  components: {
    BaseHeroPost
  },
  computed: {},
  methods: {},
  filters: {},
  watch: {}
}
</script>

<style lang="scss">
.post {
  min-height: 805px;
  background: #fff;
}

.content {
  padding: 50px 0;
}

.innerhtml {
  color: #000 !important;

  img {
   width: 100%;
  }

  // reset
  img, p, span, h1, h2,
  h3, h5, h6 {
    color: #000 !important;
    margin-bottom: 6px;
    font-family: Poppins,sans-serif;
  }

  p {
    text-align: justify;
  }

  span, p {
    font-size: 20px;
    line-height: 30px;
    margin-bottom: 6px;
  }
}

</style>
