<template>
  <div class="home">
    <NavBar/>
    <section id="home" class="home">
      <BaseHeroImage urlImg="http://trydo.rainbowit.net/assets/images/bg/bg-image-28.jpg"/>
    </section>

    <section id="about" class="about">
      <b-container>
        <b-row class="about-area padding-area">
          <b-col cols="12" sm="12" lg="5">
            <img src="http://trydo.rainbowit.net/assets/images/about/about-8.jpg" alt="">
          </b-col>
          <b-col col md="7">
            <b-row>
              <b-col cols="12">
                <div class="inner">
                  <div class="section-title">
                    <h2>About me</h2>
                    <p class="description" v-for="(desc, index) in about.descriptions" :key="index">{{desc}}</p>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <div class="inner">
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section id="portfolio" class="portfolio padding-area">
      <b-container>
        <b-row>
          <b-col cols="12" sm="12" md="12">
            <div class="section-title text-center">
              <h2>My Latest Project</h2>
              <p>There are many variations of passages of Lorem Ipsum available.</p>
            </div>
          </b-col>
        </b-row>
        <b-row class="content-area text-center">
          <b-col cols="12" md="6" lg="4" v-for="post in latastPosts" :key="post._id">
           <BasePostThumb :data="post" />
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section id="blog" class="blog padding-area">
      <b-container>
        <b-row>
          <b-col cols="12" sm="12" md="12">
            <div class="section-title text-center">
              <h2>Latest Posts</h2>
              <p>There are many variations of passages of Lorem Ipsum available.</p>
            </div>
          </b-col>
        </b-row>
        <b-row class="content-area text-center">
          <b-col cols="12" md="6" lg="4" v-for="post in latastPosts" :key="post._id">
           <BasePostThumb :data="post" />
          </b-col>
        </b-row>
        <b-row class="text-center" v-if="latastPosts.lenght > 3">
          <b-col cols="12" lg="12">
            <button class="default-button">MORE</button>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section id="contact" class="contact">
      <b-container>
        <b-row class="padding-area">
          <b-col lg="6" order="2" order-lg="1">
            <div class="">
              <BaseContactForm/>
            </div>
          </b-col>
          <b-col lg="6" order="1" order-lg="2">
            <div class="">
              <img src="http://trydo.rainbowit.net/assets/images/about/about-9.jpg" alt="talk to me">
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>

// Services
import { getLatestPost } from '../../services/api'

// Components
const NavBar = () => import('@/components/layout/TheNavBar')
const BaseHeroImage = () => import('@/components/fragments/BaseHeroImage')
const BaseContactForm = () => import('@/components/fragments/BaseContactForm')
const BasePostThumb = () => import('@/components/fragments/BasePostThumb')
export default {
  name: 'HomePage',
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    this.returnPosts()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  data () {
    return {
      latastPosts: [],
      about: {
        descriptions: [
          'I am an eternal student, Full-Stack Developer. In fact, I have a Bachelor of Science in Computer Science. Its not just my professional background. It is also and above all a passion that has grown since I was a child. I am an autonomous self-taught teacher and I love to learn new things, certainly not without difficulties, hehe, but I have always managed to overcome obstacles and solve the problems I encountered!',
          'I am a born gamer, I love to play. I have currently returned to the seas of Sea of ​​Thieves, so there is where they can find me when I am away'
        ]
      }
    }
  },
  components: {
    NavBar,
    BaseHeroImage,
    BaseContactForm,
    BasePostThumb
  },
  computed: {},
  methods: {
    async returnPosts () {
      const posts = await getLatestPost()
      this.latastPosts = posts
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
  line-height: 30px;
  font-weight: 300;
  color: $middle-gray;
}

.content-area {
  padding: 40px 0;
}

// Section About

.about {
  background: $default-gray;
}

// Section Portfolio

.portfolio {
  background: $default-black;
  color: #fff;
}

// Section Blog

.blog {
  background: $default-gray;
  color: #fff;
}

// Section Contact
.contact {
  background: $default-black;
}
</style>
