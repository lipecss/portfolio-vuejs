<template>
  <div class="hero-banner">
    <b-container>
      <div class="row">
        <div class="col-lg-12">
          <div class="inner text-left">
            <span>Welcome to my World</span>
            <h1 class="title">Hi, I’m Felipecss <br></h1>
            <h2>based in USA.</h2>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'BaseHeroImage',
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  destroyed () {},
  data () {
    return {}
  },
  props: {},
  computed: {},
  methods: {},
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
  padding: 150px 0;
}
</style>
