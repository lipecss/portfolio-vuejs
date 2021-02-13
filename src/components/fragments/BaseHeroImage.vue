<template>
  <div class="hero-banner">
    <b-container>
      <b-row class="about-area padding-area">
        <b-col cols="12" lg="6" class="">
           <div class="inner">
            <span>Welcome to my World</span>
            <h1 class="title">Hi, I’m Felipecss <br></h1>
            <div class="skills">
              <span>Js Developer</span>
            </div>
            <h2 class="location">based in USA.</h2>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'BaseHeroImage',
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
  },
  beforeUpdate () {},
  updated () {},
  destroyed () {},
  data () {
    return {
      skillToShow: '',
      skills: ['JS Developer.', 'Front End.', 'Back End.', 'Game Developer.']
    }
  },
  props: {},
  computed: {},
  methods: {
    changeSkill () {
      for (let i = 1; i <= this.skills.length; i++) {
        const delay = i * 300
        console.log(i)
        setTimeout(function () {
          console.log(this.items[i])
        }, delay)
      }
    }
  },
  filters: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.hero-banner {
  background-color: #101010;
  background-image: url(http://trydo.rainbowit.net/assets/images/bg/bg-image-28.jpg)!important;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 230px 0;
}

.inner {
  padding: 0 30px;

  span {
    color: #c6c9d8bf;
    font-size: 22px;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 4px;
    display: block;
  }

  .title {
    color: #fff;
    font-size: 32px;
    line-height: 49px;
    font-weight: 900;
    font-family: Montserrat,sans-serif;
  }

  .skills {
    span {
      color: $vue-green;
      font-size: 32px;
      line-height: 49px;
      font-weight: 700;
    }
  }

  .location {
    color: #fff;
    font-size: 32px;
    line-height: 1.3;
    font-weight: 700;
  }
}
</style>
