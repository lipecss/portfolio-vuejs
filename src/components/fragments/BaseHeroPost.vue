<template>
  <b-container fluid :style="style">
    <b-row>
      <b-col cols="12" lg="12" class="">
        <div class="text-center">
          <h2 class="title">{{ title }}</h2>
          <ul class="blog-meta justify-content-center align-items-center"><li><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>May 18, 2020</li><li><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>NipaBali</li><li><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>15 Comments</li><li><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>Like</li></ul>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'BaseHeroPost',
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
  props: {
    urlImg: { type: String, required: true },
    title: { type: String, required: true },
    options: { type: Array }
  },
  computed: {
    style () {
      const img = this.urlImg
      return {
        position: 'relative',
        backgroundImage: `url(${img})`,
        backgroundPosition: '50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        padding: '190px 0'
      }
    }
  },
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
.title {
  font-weight: 700;
  line-height: 90px;
  font-size: 72px;
  text-transform: uppercase;
  background: -webkit-linear-gradient(145deg,#5b7363,$vue-green);
  background: -webkit-linear-gradient(305deg,#5b7363,$vue-green);
  background: linear-gradient(145deg,#5b7363,$vue-green);
  font-family: Montserrat,sans-serif;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
