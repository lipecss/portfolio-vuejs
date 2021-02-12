<template>
  <b-navbar toggleable="lg" :class="{ change_color: scrollPosition > 50 }" :sticky=true>
    <b-nav-item align="right"><router-link to="/">
      <b-navbar-toggle target="nav_collapse" class="navbar-dark"></b-navbar-toggle>
    </router-link></b-nav-item>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item style="margin: 0 15px;">
          <router-link to="/">Home</router-link>
        </b-nav-item>
        <b-nav-item style="margin: 0 15px;">
          <a href="#">About</a>
        </b-nav-item>
        <b-nav-item style="margin: 0 15px;">
          <a href="#">Portolio</a>
        </b-nav-item>
        <b-nav-item style="margin: 0 15px;">
          <a href="#">Blog</a>
        </b-nav-item>
        <b-nav-item style="margin: 0 15px;">
          <a href="#">Contact</a>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'TheNavBar',
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    window.addEventListener('scroll', this.updateScroll)
  },
  beforeUpdate () {},
  updated () {},
  destroyed () {},
  data () {
    return {
      scrollPosition: null
    }
  },
  props: {},
  computed: {},
  methods: {
    updateScroll () {
      this.scrollPosition = window.scrollY
    }
  },
  filters: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.navbar {
  position: absolute;
  top: 0;
  z-index: 999;
  padding: 30px;
  background-color: transparent;
  border: none;
  list-style: none;
}
.change_color {
  position: fixed;
  width: 100%;
  background-color: #191919 !important;
  transition: background-color 0.4s ease-out;
}

a {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}
</style>
