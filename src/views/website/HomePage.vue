<template>
  <div class="home">
    <section id="home" class="home">
      <BaseHeroImage/>
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
                    <p class="description">There are many variations of passages of Lorem Ipsum available, but the majority have suffered &lt;a href="#"&gt;alteration&lt;/a&gt; in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum,</p>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <div class="inner">
                    fgfg
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section id="portfolio" class="portfolio">
      <b-container>
        <b-row class="portfolio-area text-center padding-area">
          <b-col md="12">
            <div class="">
              <h2 class="title">My Awesome Service</h2>
              <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
            </div>
            <b-row class="portfolio-projects text-center">
              <b-col md="6" v-for="item in list" :key="item.id">
                <div class="tumb">
                  <div class="tumbimage">
                    <div class="inner">
                      {{item}}
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section id="blog" class="blog">
      <b-container>
        <b-row class="blog-area text-center padding-area">
          <b-col md="12">
            <div class="">
              <h2 class="title">My Awesome Service</h2>
              <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section id="contact" class="contact">
      <b-container>
        <b-row class="blog-area text-center padding-area">
          <b-col md="12">
            <div class="">
              <h2 class="title">My Awesome Service</h2>
              <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
const BaseHeroImage = () => import('@/components/fragments/BaseHeroImage')
export default {
  name: 'HomePage',
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  data () {
    return {
      list: [
        { id: 1, color: 'red' },
        { id: 2, color: 'green' },
        { id: 3, color: 'purple' },
        { id: 4, color: 'tomato' },
        { id: 5, color: 'blue' },
        { id: 6, color: 'yellow' }
      ]
    }
  },
  components: {
    BaseHeroImage
  },
  computed: {},
  methods: {},
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

.padding-area {
  padding: 120px 0;
}

// Section About

.about {
  background: $default-gray;
  color: #fff;
}

.inner .section-title h2 {
  font-size: 56px;
  margin-bottom: 8px;
  font-weight: 700;
}

.inner .section-title p {
  font-size: 18px;
  line-height: 30px;
  font-weight: 300;
  color: #717173;
}

// Section Portfolio

.portfolio {
  background: $default-black;
}

// Section Blog

.blog {
  background: $default-gray;
  color: #fff;
}
</style>
