<template>
  <div class="hero-banner" :style="style">
    <b-container>
      <b-row class="about-area padding-area">
        <b-col cols="12" lg="6" class="">
           <div class="inner">
            <span>Welcome to my World</span>
            <h1 class="title">Hi, I’m Felipecss <br></h1>
            <div class="skills">
              <span id="skill-text">Js Developer.</span>
            </div>
            <h2 class="location">Living in Brazil</h2>
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
    this.changeSkill()
  },
  beforeUpdate () {},
  updated () {},
  destroyed () {},
  data () {
    return {
      skills: ['JS Developer.', 'Front End.', 'Back End.', 'Game Developer.']
    }
  },
  props: {
    urlImg: { type: String, required: true }
  },
  computed: {
    style () {
      const img = this.urlImg
      return {
        backgroundImage: `url(${img})`,
        backgroundPosition: '50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        padding: '230px 0'
      }
    }
  },
  methods: {
    changeSkill () {
      var index = 1
      const item = document.getElementById('skill-text')
      setInterval(() => {
        if (item && index < this.skills.length) {
          item.innerText = this.skills[index]
          index++
        } else {
          index = 1
        }
      }, 2800)
    }
  },
  filters: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
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
