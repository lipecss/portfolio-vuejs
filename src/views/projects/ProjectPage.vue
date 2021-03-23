<template>
  <b-container fluid class="project">
    <TheBackToHome/>
    <TheBackToTop/>

    <b-row class="mb-3">
      <b-col class="no-padding">
        <div class="header">
          <h2 class="title gradient-text">{{ $t('pages.projects.projectListPage.html.title') }}</h2>
          <ul class="page-list">
            <li class="breadcrumb-item">{{ $t('pages.projects.projectListPage.link') }}</li>
            <li class="breadcrumb-item" style="color: #42b883">
              <router-link to="/project" class="">{{ $t('pages.projects.projectListPage.html.title') }}</router-link>
            </li>
          </ul>
        </div>
      </b-col>
    </b-row>

    <b-row class="mb-3">
      <b-col md="10" offset-md="1">
        <div class="project__content-area">
          <h2 class="project__content-area-title">{{ project.name }}</h2>

          <div class="project__content-area-description mt-5">
            {{ project.description }}
          </div>

          <div class="project__content-area-portfolio-thumb mt-5">
            <div v-for="(img, index) in project.images" :key="index" class="thumb mb-3" >
              <img :src="img" :alt="`${project.name}-${index}`" class="image">
            </div>
          </div>

          <div class="project__content-area-skills mt-2">
            <h4 class="mb-3">Linguagens e ferramentas</h4>
            <ul>
              <li v-for="skill in project.skills" :key="skill._id">
                <div v-html="skill.image"></div>
                <p>{{skill.name}}</p>
              </li>
            </ul>
          </div>
        </div>
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
export default {
  name: 'BlogPage',
  metaInfo () {
    return {
      title: this.project.name,
      meta: [
        // Facebook
        { property: 'og:title', content: this.project.slug },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${process.env.VUE_APP_BASE}/${this.project.slug}` },
        { property: 'og:description', content: this.project.description },
        { property: 'og:image', content: this.project.images[0] },
        { property: 'og:site_name', content: this.project.slug },

        // Twitter

        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: `${process.env.VUE_APP_BASE}/${this.project.slug}` },
        { property: 'twitter:title', content: this.project.slug },
        { property: 'twitter:description', content: this.project.description },
        { property: 'twitter:image', content: this.project.images[0] }
      ],
      link: [
        { rel: 'canonical', href: `${process.env.VUE_APP_BASE}/${this.project.slug}` }
      ]
    }
  },
  beforeCreate () {},
  created () {
    this.project = this.$route.params.project
  },
  beforeMount () {},
  mounted () {
    this.initResize()
    window.addEventListener('resize', this.resize)
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {
    window.removeEventListener('scroll', this.resize)
  },
  data () {
    return {
      project: []
    }
  },
  components: {
    BaseAlternativeFooter: () => import('@/components/layout/BaseAlternativeFooter'),
    TheBackToHome: () => import('@/components/layout/TheBackToHome'),
    TheBackToTop: () => import('@/components/layout/TheBackToTop')
  },
  computed: {},
  methods: {
    resize () {
      const width = window.innerWidth
      if (width <= 1024) {
        this.setHeightResponsive()
      } else this.setHeight400()
    },
    initResize () {
      const width = window.innerWidth
      if (width <= 1024) {
        this.setHeightResponsive()
      } else if (width >= 1400) {
        this.setHeight400()
      }
    },
    setHeight400 () {
      const el = document.getElementsByClassName('image')
      el.forEach(async (img) => {
        if (img.clientHeight >= 800) {
          img.style.width = await '400px'
          img.style.display = await 'block'
          img.style.margin = await '0 auto'
        }
      })
    },
    setHeightResponsive () {
      const el = document.getElementsByClassName('image')
      el.forEach(async (img) => {
        img.style.width = await '100%'
        img.style.margin = await '0'
      })
    }
  },
  filters: {},
  watch: {}
}
</script>

<style lang="scss">
svg {
  width: 100%;
  height: 100%;
}
.project {
  color: #000;

  &__content-area {
    padding: 120px 0;
    min-height: 900px;

    &-title {
      line-height: 60px;
      display: block;
      margin-bottom: 0;
      padding-bottom: 43px;
      border-bottom: 1px solid #000000;
      color: #000;
      font-size: 40px;
      font-weight: 700;
    }

    &-description {
      line-height: 28px;
      font-size: 16px;
    }

    &-portfolio-thumb {
      img {
        border-radius: 6px;
      }
    }

    &-skills {
      ul {
        list-style: none;
        padding: 0;

        li {
          width: 6%;

          p {
            text-align: center;
            font-size: 16px;
            color: rgba(29,29,36,.75);
            display: block;
            margin-bottom: 10px;
            font-weight: 500;
          }
        }
      }
    }
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
