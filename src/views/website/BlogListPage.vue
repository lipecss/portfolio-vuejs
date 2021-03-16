<template>
  <b-container fluid class="blog-list">
    <TheBackToHome/>
    <loading :active.sync="isLoading"
      color="#42b883"
      :can-cancel="false"
      :lock-scroll="true"
      :is-full-page="true"
      background-color="#000">
    </loading>

    <b-row>
      <b-col cols="12" lg="12" class="no-padding">
        <div class="header">
          <h2 class="title gradient-text">Blog List</h2>
          <ul class="page-list">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item" style="color: #42b883">Blog List</li>
          </ul>
        </div>
      </b-col>
    </b-row>

    <b-container>
      <b-row class="content-area text-center">
        <b-col cols="12" md="6" lg="4" v-for="post in posts" :key="post._id" class="thumb">
          <BasePostThumb :data="post"/>
        </b-col>
      </b-row>

      <b-row class="text-center" v-if="currentPage >= maxPage">
        <p id="nothing">Nothing more to show</p>
        <b-col cols="12" lg="12">
          <div class="wrap">
            <b-row>
              <b-col md="6" offset-md="3">
                <div class="typying">
                  <h3>Stay tuned for upcoming posts 💎</h3>
                  <vue-typed-js
                  :strings="strings"
                  :loop="true"
                  :shuffle="true"
                  :backSpeed="80"
                  :backDelay="1000"
                  :cursorChar="''"
                  v-if="currentPage >= maxPage">
                    <h4 class="typing text-center"></h4>
                  </vue-typed-js>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay'

import 'vue-loading-overlay/dist/vue-loading.css'

const BasePostThumb = () => import('@/components/fragments/BasePostThumb')
const TheBackToHome = () => import('@/components/layout/TheBackToHome')

export default {
  name: 'BlogPage',
  beforeCreate () {},
  created () {
    this.getInitialPosts()
  },
  beforeMount () {},
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
  },
  data () {
    return {
      posts: [],
      isLoading: false,
      currentPage: 1,
      maxPage: 0,
      strings: [
        'If I drink water while I shower, am I taking a shower then?',
        '"If you want to know what a man’s like, take a good look at how he treats his inferiors, not his equals."',
        '"Fear is the path to the dark side. Fear leads to anger. Anger leads to hate. Hate leads to suffering."',
        'Perfection is the enemy of perfectly adequate.',
        'Everyone likes the comments on Youtube with the lyrics of the songs, especially when you are too lazy to search Google.',
        '"Martha. Why did you say that name ? 🦇"'
      ]
    }
  },
  components: {
    Loading,
    BasePostThumb,
    TheBackToHome
  },
  computed: {},
  methods: {
    getInitialPosts () {
      axios.get('http://localhost:3333/posts/paginate').then(response => {
        const postsLimit = response.data.docs.length
        this.maxPage = response.data.totalPages
        for (var i = 0; i < postsLimit; i++) {
          this.posts.push(response.data.docs[i])
        }
      })
    },
    async onScroll (element) {
      const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight

      if (bottomOfWindow) {
        if (this.currentPage < this.maxPage) {
          this.isLoading = true
          setTimeout(() => {
            this.currentPage += 1
            this.isLoading = false
            // eslint-disable-next-line prefer-const
            let page = this.currentPage
            axios.get(`http://localhost:3333/posts/paginate?page=${page}`).then(response => {
              const postsLimit = response.data.docs.length
              if (page <= response.data.totalPages) {
                for (var i = 0; i < postsLimit; i++) {
                  this.posts.push(response.data.docs[i])
                }
              } else {
                this.currentPage = this.maxPage
                return false
              }
            })
          }, 300)
        }
      }
    }
  },
  filters: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.blog-list {
  min-height: 900px;
  color: #fff;
}
.content-area {
  padding: 160px 0;
}

.header {
  padding: 120px 0;
  background-image: url(https://image.freepik.com/free-photo/black-simple-textured-background-design_53876-63595.jpg);
  background-size: 100%;
  background-repeat: no-repeat;
  text-align: center;

  .title {
    font-weight: 700;
    font-size: 54px;
  }
  .page-list {
    display: inline-flex;
    list-style: none;
    li {
      color: #6c7573
    }
  }
}

.thumb:nth-child(-n+3) {
  padding-bottom: 20px;
}

#nothing {
  font-size: 17px;
  font-weight: 500;
  line-height: 1.3;
  max-width: 450px;
  margin: 0 auto;
  padding-bottom: 20px;
  color: #6c7573;
}

.wrap {
  margin-bottom: 10vh;

  .typying {
    h3 {
      font-size: 40px;
      font-weight: 800;
      line-height: 1.2;
      margin: 5px auto 20px;
      padding: 16px 0;
      letter-spacing: 1px;
      color: #000;
      border-top: 7px solid #57ba726e;
    }
    h4 {
      font-size: 17px;
      font-weight: 500;
      line-height: 1.3;
      max-width: 450px;
      margin: 0 auto;
      color: #6c7573;
    }
  }
}
</style>
