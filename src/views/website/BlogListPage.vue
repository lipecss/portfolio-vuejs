<template>
  <b-container fluid class="blog-list">
    <TheBackToHome/>
    <TheBackToTop />
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
          <h2 class="title gradient-text">{{ $t('pages.website.blogListPage.html.title') }}</h2>
          <ul class="page-list">
            <li class="breadcrumb-item">{{ $t('pages.website.blogListPage.link') }}</li>
            <li class="breadcrumb-item" style="color: #42b883">{{ $t('pages.website.blogListPage.html.title') }}</li>
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
        <p id="nothing">{{ $t('pages.website.blogListPage.noMore.nothing') }}</p>
        <b-col cols="12" lg="12">
          <div class="wrap">
            <b-row>
              <b-col md="6" offset-md="3">
                <div class="typying">
                  <h3>{{ $t('pages.website.blogListPage.noMore.title') }}</h3>
                  <vue-typed-js
                  :strings="$t('pages.website.blogListPage.noMore.types')"
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

export default {
  name: 'BlogPage',
  metaInfo () {
    return {
      title: this.$t('pages.website.blogListPage.html.title')
    }
  },
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
      maxPage: 0
    }
  },
  components: {
    Loading,
    TheBackToTop: () => import('@/components/layout/TheBackToTop'),
    BasePostThumb: () => import('@/components/fragments/BasePostThumb'),
    TheBackToHome: () => import('@/components/layout/TheBackToHome')
  },
  computed: {},
  methods: {
    getInitialPosts () {
      axios.get(`${process.env.VUE_APP_API}/posts/paginate`).then(response => {
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
            axios.get(`${process.env.VUE_APP_API}/posts/paginate?page=${page}`).then(response => {
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

.thumb {
  padding-top: 20px;
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
