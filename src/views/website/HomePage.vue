<template>
  <div class="home">
    <NavBar/>
    <TheBackToTop/>
    <BaseAlerts :propClearAlert="hasError" :propTypeAlert="typeAlert" @alert-is-close="changeHasAlert('alertFalse', $event)" />
    <section id="home" class="home">
      <BaseHeroImage urlImg="../../assets/img/base-hero.png"/>
    </section>

    <section id="about" class="about">
      <b-container>
        <b-row class="about-area padding-area">

          <b-col cols="12" sm="12" lg="5">
            <img src="../../assets/img/about.png" alt="" width="100%" height="100%">
          </b-col>

          <b-col col md="7">
            <div class="inner">
              <div class="section-title">
                <h2>{{ $t('pages.website.homePage.sections.about.title') }}</h2>
                <p class="description" v-for="(desc, index) in $t('pages.website.homePage.sections.about.descriptions')" :key="index">{{desc}}</p>
              </div>

              <div class="about-area__social">
                <label v-for="(item, index) in social" :key="index" class="ml-2 mr-2">
                  <a :href="item.href" target="_blank" rel="noopener noreferrer" class="social-myself" :title="item.title">
                    <font-awesome-icon :icon="['fab', item.icon]" size="3x"/>
                  </a>
                </label>
                <label class="ml-2 mr-2">
                  <a :href="pdfLink" target="_blank" rel="noopener noreferrer" class="social-myself" download="Felipecss_Resume" :title="$t('messages.download')">
                    <font-awesome-icon :icon="['fas', 'file-pdf']" size="3x" />
                  </a>
                </label>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section id="skill" class="skill padding-area">
      <b-container>
        <b-row >
          <b-col cols="12" sm="12" md="12">
            <div class="section-title text-center">
              <h2>{{ $t('pages.website.homePage.sections.skill.title') }}</h2>
              <p>{{ $t('pages.website.homePage.sections.skill.subtitle') }}</p>
            </div>
          </b-col>
        </b-row>

        <b-row class="skill-area">
          <b-col lg="6">
            <h3 class="text-center">{{ $t('pages.website.homePage.sections.skill.competences.title') }}</h3>
            <b-row>
              <b-col sm="4" md="6" lg="6" >
                <span v-for="competence in $t('pages.website.homePage.sections.skill.competences.array')" :key="competence.index">
                  <BaseDonut :text="competence.text" value="100%"/>
                </span>
              </b-col>
              <b-col sm="4" md="6" lg="6">
                <span v-for="competence in $t('pages.website.homePage.sections.skill.competences.array2')" :key="competence.index">
                  <BaseDonut :text="competence.text" value="100%"/>
                </span>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12" class="d-none d-md-block text-center">
                <h3 class="text-center">{{ $t('pages.website.homePage.sections.skill.languages.title') }}</h3>
                <div v-for="(lang, index) in $t('pages.website.homePage.sections.skill.languages.array')" :key="index" class="flags">
                  <country-flag :country='lang.flag' size='big'/>
                  <span>{{ lang.language }}</span>
                </div>
              </b-col>
            </b-row>
          </b-col>

          <b-col lg="6">
            <div class="tabs">
              <ul class="tab-list">
                <li
                v-for="tab in $t('pages.website.homePage.sections.skill.skillTabs')"
                :key="tab.id"
                :class="{ tabSelected: tab.id === activetab }"
                @click="activetab = tab.id">
                  {{ tab.tabName }}
                </li>
              </ul>
            </div>

            <div class="content-skill-tabs">
              <section v-if="activetab === 1" class="tab-skill">
                <HorizontalChart :items="webSkills"/>
              </section>

              <section v-if="activetab === 2" class="tab-education">
                <ul>
                  <li>
                    <p>Diploma in Computer Science - Uninove</p>
                    <span>2016</span>
                  </li>
                  <li>
                    <p>Ruby on Rails 4.x</p>
                    <span>2018</span>
                  </li>
                  <li>
                    <p>Vue - The Complete Guide by Maximilian Schwarzmüller</p>
                    <span>2020</span>
                  </li>
                </ul>
              </section>

              <section v-if="activetab === 3" class="tab-experience">
                <ul>
                  <li>
                    <p>Front-end Engineer - Self-employment</p>
                    <span>Current</span>
                  </li>
                  <li>
                    <p>Full Stack Javascript - Self-employment</p>
                    <span>2019</span>
                  </li>
                  <li>
                    <p>Ruby Back-end developer - <span>Find-me</span></p>
                    <span>2018 - 2019</span>
                  </li>
                  <li>
                    <p>Tax analyst - <span>Universidade Nove de Julho</span></p>
                    <span>2012 - 2018</span>
                  </li>
                </ul>
              </section>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section id="portfolio" class="portfolio padding-area">
      <b-container>
        <b-row>
          <b-col cols="12" sm="12" md="12">
            <div class="section-title text-center">
              <h2>{{ $t('pages.website.homePage.sections.portfolio.title') }}</h2>
              <p>{{ $t('pages.website.homePage.sections.portfolio.subtitle') }}</p>
            </div>
          </b-col>
        </b-row>
        <b-row class="content-area text-center">
          <b-col cols="12" md="6" lg="4" v-for="project in latastProject" :key="project._id" class="thumb">
           <BaseProjectThumb :data="project" />
          </b-col>
        </b-row>
        <b-row class="text-center" v-if="latastProject.length > 3">
          <b-col cols="12" lg="12">
            <router-link to="/project">
            <button class="default-button">{{ $t('buttons.more') }}</button>
          </router-link>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section id="blog" class="blog padding-area">
      <b-container>
        <b-row>
          <b-col cols="12" sm="12" md="12">
            <div class="section-title text-center">
              <h2>{{ $t('pages.website.homePage.sections.blog.title') }}</h2>
              <p>{{ $t('pages.website.homePage.sections.blog.subtitle') }}</p>
            </div>
          </b-col>
        </b-row>
        <b-row class="content-area text-center">
          <b-col cols="12" md="6" lg="4" v-for="post in latastPosts" :key="post._id" class="thumb">
            <BasePostThumb :data="post"/>
          </b-col>
        </b-row>
        <b-row class="text-center" v-if="latastPosts.length > 3">
          <b-col cols="12" lg="12">
            <router-link to="/blog">
            <button class="default-button">{{ $t('buttons.more') }}</button>
          </router-link>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section id="contact" class="contact" ref="contact">
      <b-container>
        <b-row class="padding-area">
          <b-col lg="6" order="2" order-lg="1">
            <div class="">
              <BaseContactForm @contact="sendContact"/>
            </div>
          </b-col>
          <b-col lg="6" order="1" order-lg="2">
            <div class="">
              <img src="../../assets/img/contact.png" alt="talk to me" width="100%" height="100%">
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import CountryFlag from 'vue-country-flag'

// Services
import { getLatestPost, getLatestProject, contactMe } from '../../services/api'

export default {
  name: 'HomePage',
  metaInfo () {
    return {
      title: this.$t('pages.website.homePage.html.title')
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    this.returnPosts()
    this.returnProjects()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  data () {
    return {
      latastPosts: [],
      latastProject: [],
      activetab: 1,
      webSkills: [
        { name: 'HTML/CSS', width: 100, timer: 10 },
        { name: 'SASS/LESS', width: 78, timer: 20 },
        { name: 'Javascript', width: 100, timer: 30 },
        { name: 'Vuejs / Vuex', width: 90, timer: 10 },
        { name: 'Nodejs', width: 98, timer: 10 },
        { name: 'Express', width: 95, timer: 20 },
        { name: 'Restfull API', width: 95, timer: 30 },
        { name: 'VPS/Web Hosting', width: 70, timer: 10 },
        { name: 'Bootstrap', width: 100, timer: 20 },
        { name: 'Git', width: 80, timer: 30 },
        { name: 'Scrum & Kambam', width: 70, timer: 10 },
        { name: 'SQL', width: 98, timer: 20 },
        { name: 'No Sequel', width: 90, timer: 30 },
        { name: 'C#', width: 95, timer: 10 },
        { name: 'Unity', width: 95, timer: 10 },
        { name: 'Linux', width: 80, timer: 20 },
        { name: 'React', width: 60, timer: 30 },
        { name: 'React Native', width: 60, timer: 10 }
      ],
      social: [
        { icon: 'xbox', href: 'https://account.xbox.com/pt-br/Profile?xr=socialtwistnav&activetab=main:mainTab2', title: 'Xbox' },
        { icon: 'spotify', href: 'https://open.spotify.com/user/felipessz?si=1285b442a8db41bd', title: 'Spotify' },
        { icon: 'twitch', href: 'https://www.twitch.tv/felipecss', title: 'Twitch' }
      ],
      pdfLink: require('@/assets/felipecssResume.pdf'),
      typeAlert: 'error',
      hasError: false
    }
  },
  components: {
    NavBar: () => import('@/components/layout/TheNavBar'),
    TheBackToTop: () => import('@/components/layout/TheBackToTop'),
    BaseHeroImage: () => import('@/components/fragments/BaseHeroImage'),
    BaseContactForm: () => import('@/components/fragments/BaseContactForm'),
    BasePostThumb: () => import('@/components/fragments/BasePostThumb'),
    BaseDonut: () => import('@/components/fragments/BaseDonut'),
    HorizontalChart: () => import('@/components/fragments/BaseHorizontalChart'),
    BaseProjectThumb: () => import('@/components/fragments/BaseProjectThumb'),
    BaseAlerts: () => import('@/components/fragments/BaseAlerts'),
    CountryFlag
  },
  computed: {},
  methods: {
    async returnPosts () {
      const posts = await getLatestPost()
      this.latastPosts = posts
    },
    async returnProjects () {
      const projects = await getLatestProject()
      this.latastProject = projects
    },
    async sendContact (data) {
      const result = await contactMe(data.name, data.from, data.subject, data.message)
      if (result.status === 'error') {
        this.setErrors([this.$t('messages.contact.error')])
        this.setBlockUi(true)
        this.hasError = true
      } else {
        this.setErrors([this.$t('messages.contact.success')])
        this.setBlockUi(true)
        this.hasError = true
        this.typeAlert = 'success'
      }
    },
    changeHasAlert (refValue, eventValue) {
      if (refValue === 'alertFalse') {
        this.hasError = eventValue
      }
    }
  },
  filters: {},
  watch: {}
}
</script>

<style lang="scss">
img {
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 25px 65px rgb(0 0 0 / 10%);
}

.thumb:nth-child(-n+3) {
  padding-bottom: 20px;
 }

// general
.padding-area {
  padding: 120px 0;
}

.section-title h2 {
  font-size: 56px;
  margin-bottom: 8px;
  font-weight: 700;
  color: #fff;
}

.section-title p {
  font-size: 18px;
  font-weight: 300;
  color: $middle-gray;
}

.content-area {
  padding: 10px 0;
}

// Section About

.about {
  background: $default-gray;
}

.about-area__social {
  display: flex;
  justify-content: center;

  a {
    color: $middle-gray;
  }
  .social-myself {
    &:hover {
      color: $vue-green;
    }
  }
}

// Section Skill
.skill {
  background: $default-black;
  color: #fff;

  ul {
    list-style: none;
  }

  .tabSelected {
    color: $vue-green;
    &::before {
      width: 18% !important;
      background: $vue-green !important;
    }
  }

  .flags {
    display: inline-grid;

    span {
      margin: 5px 10px;
      font-weight: 200;
      color: #afafaf;
    }
  }

  .tab-list {
    position: relative;
    display: inline-flex;

    &:hover {
      cursor: pointer;
    }

    li {
      text-align: center;
      font-size: 17px;
      padding-bottom: 4px;

      &:not(:first-child) {
        margin: 0 15px;
      }

      &::before {
        position: absolute;
        content: "";
        width: 30px;
        background: $clean-gray;
        height: 2px;
        bottom: 0;
      }
    }
  }

  // tabs {
  .tab-education, .tab-experience {

    li {
      margin-bottom: 8px;
      p {
        font-weight: 200;
        margin-bottom: 0;
        color: $middle-gray;
      }
    }
  }
}

// Section Portfolio

.portfolio {
  background: $default-gray;
  color: #fff;
}

// Section Blog

.blog {
  background: $default-black;
  color: #fff;
}

// Section Contact
.contact {
  background: $default-gray;
}
</style>
