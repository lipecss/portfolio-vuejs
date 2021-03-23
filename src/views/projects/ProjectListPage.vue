<template>
  <b-container fluid class="project-list text-center">
    <TheBackToHome/>
    <TheBackToTop/>
    <loading :active.sync="isLoading"
      color="#42b883"
      :can-cancel="false"
      :lock-scroll="true"
      :is-full-page="true"
      background-color="#000">
    </loading>

    <b-row class="mb-3">
      <b-col class="no-padding">
        <div class="header">
          <h2 class="title gradient-text">{{ $t('pages.projects.projectListPage.html.title') }}</h2>
          <ul class="page-list">
            <li class="breadcrumb-item">{{ $t('pages.projects.projectListPage.link') }}</li>
            <li class="breadcrumb-item" style="color: #42b883">{{ $t('pages.projects.projectListPage.html.title') }}</li>
          </ul>
        </div>
      </b-col>
    </b-row>

    <b-row class="mb-3">
      <b-col md="10" offset-md="1">
        <b-row class="content-area text-center">
          <b-col cols="12" md="6" lg="4" v-for="project in projects" :key="project._id" class="thumb">
            <BaseProjectThumb :data="project"/>
          </b-col>
        </b-row>

        <b-row class="mb-5" v-if="currentPage >= maxPage">
          <b-col cols="12" lg="12">
            <p id="nothing">{{ $t('pages.website.blogListPage.noMore.nothing') }}</p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row>
      <b-col class="no-padding">
        <BaseAlternativeFooter/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'ProjectListPage',
  metaInfo () {
    return {
      title: this.$t('pages.website.blogListPage.html.title'),
      meta: [
        { name: 'robots', content: 'index, follow' },
        { name: 'description', content: 'Esse site é meu cantinho, o lugar do Felipecss, na qual você poderá conhecer um pouco de tudo, dos meus projetos, trabalhos, gostos e de mim. Estou super ansioco para trocarmos um papo!' },
        { name: 'keywords', content: 'felipecss, felipe, vuejs, vue, javascript, developer, development, desenvolvedor' }
      ]
    }
  },
  beforeCreate () {},
  created () {
    this.getInitialProjects()
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
      projects: [],
      isLoading: false,
      currentPage: 1,
      maxPage: 0
    }
  },
  components: {
    Loading: () => import('vue-loading-overlay'),
    BaseAlternativeFooter: () => import('@/components/layout/BaseAlternativeFooter'),
    BaseProjectThumb: () => import('@/components/fragments/BaseProjectThumb'),
    TheBackToHome: () => import('@/components/layout/TheBackToHome'),
    TheBackToTop: () => import('@/components/layout/TheBackToTop')
  },
  computed: {},
  methods: {
    getInitialProjects () {
      axios.get('http://localhost:3333/project/paginate').then(response => {
        const postsLimit = response.data.docs.length
        this.maxPage = response.data.totalPages
        for (var i = 0; i < postsLimit; i++) {
          this.projects.push(response.data.docs[i])
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
            axios.get(`http://localhost:3333/project/paginate?page=${page}`).then(response => {
              const postsLimit = response.data.docs.length
              if (page <= response.data.totalPages) {
                for (var i = 0; i < postsLimit; i++) {
                  this.projects.push(response.data.docs[i])
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
.project-list {
  min-height: 900px;
  color: #fff;

  .content-area {
    padding: 160px 0;
  }

  .header {
    padding: 120px 0;
    background: linear-gradient(145deg,#383838,#000000);
    background-size: 100%;
    background-repeat: no-repeat;
    text-align: center;

    .title {
      font-weight: 700;
      font-size: 26px;
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

  @media screen and (min-width: 768px) {
    .header {
      .title {
        font-size: 40px;
      }
    }
  }
  @media screen and (min-width: 1024px) {
    .header {
      .title {
        font-size: 54px;
      }
    }
  }
  @media screen and (min-width: 1400px) {}
  @media screen and (min-width: 1600px) {}
}
</style>
