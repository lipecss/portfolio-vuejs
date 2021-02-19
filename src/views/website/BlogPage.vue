<template>
  <div class="posts">
    <TheBackToHome/>
    <BaseHeroPost
    :urlImg="post.img"
    :title="post.title"
    :date="post.created_at"
    @action="actionReceived"
    :likes="post.likes"
    :liked="liked"/>

    <b-container>
      <b-row class="content">
        <b-col cols="12">
          <div v-html-safe="post.content" class="ql-editor innerhtml"></div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Pusher from 'pusher-js'
import { mapActions, mapGetters } from 'vuex'

// Services
import { likePost } from '../../services/api'

const TheBackToHome = () => import('@/components/layout/TheBackToHome')
const BaseHeroPost = () => import('@/components/fragments/BaseHeroPost')
export default {
  name: 'BlogPage',
  beforeCreate () {},
  created () {
    this.post = this.$route.params.post
    this.subscribe()
    this.isAlreadyLike(this.post._id)
  },
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  data () {
    return {
      post: [],
      liked: false
    }
  },
  components: {
    TheBackToHome,
    BaseHeroPost
  },
  computed: {
    ...mapGetters('ModuleLike', ['getLikeById'])
  },
  methods: {
    ...mapActions('ModuleLike', ['pushToList', 'removeToList']),
    subscribe () {
      const pusher = new Pusher('640cf85899a511c2c024', { cluster: 'us2' })
      pusher.subscribe('portfolio-likes')
      pusher.bind('postAction', async data => {
        // this.likedPost(data.id)
        this.post.likes = data.likes
      })
    },
    async actionReceived (id) {
      const result = await this.getLikeById(id)

      if (result == null) {
        // nao tem entao add na store e manda como like no back
        this.pushToList(id)
        this.liked = true
        likePost(id, 'Like')
      } else {
        likePost(id)
        this.liked = false
        // tem, manda como dislike no back e remove da store
        this.removeToList(id)
        console.log('ja tem')
      }
    },
    async isAlreadyLike (id) {
      const result = await this.getLikeById(id)
      if (result == null) this.liked = false
      else this.liked = true
    }
  },
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

.innerhtml {
  color: #000 !important;
  margin: calc(-12vh + -15px) auto 0;
  background: #fff;
  padding: 25px 25px 100px 25px;
  // padding: 60px 85px 120px;
  border-radius: 26px;

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
