<template>
  <b-navbar toggleable="lg" :class="{ change_color: scrollPosition > 50 }" :sticky=true>
    <b-navbar-toggle target="nav_collapse" class="navbar-dark"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item class="navss" :class="{ current: (content.id === currentNav)}" v-for="content in navContent" :key="content.name" :href="content.id">{{content.name}}</b-nav-item>
        <b-nav-item class="navss" href="#blog">Blog</b-nav-item>
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
      scrollPosition: null,
      currentNav: '#home',
      navContent: [
        { name: 'Home', id: '#home' },
        { name: 'About', id: '#about' },
        { name: 'Portfolio', id: '#portfolio' },
        { name: 'Contact', id: '#contact' }
      ]
    }
  },
  props: {},
  computed: {},
  methods: {
    updateScroll (e) {
      this.scrollPosition = window.scrollY
      console.log(this.scrollPosition)
      if (window.scrollY >= 0 && window.scrollY <= 568) {
        this.currentNav = '#home'
        console.log('home')
      } else if (window.scrollY > 568 && window.scrollY <= 1374) {
        this.currentNav = '#about'
        console.log('about')
      } else if (window.scrollY > 1374) {
        this.currentNav = '#portfolio'
        console.log('portfolio')
      }
    }
  },
  filters: {},
  watch: {}
}
</script>

<style lang="scss">
.navbar {
  position: absolute;
  top: 0;
  z-index: 999;
  padding: 30px;
  background-color: transparent;
  border: none;
  list-style: none;
  width: 100%;
}

.change_color {
  position: fixed;
  background-color: #191919 !important;
  transition: background-color 0.4s ease-out;
}

.navss {
  a {
    margin: 0 15px;
    color: #fff !important;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
  }
}

ul {
  display: flex;
  align-items: center;
}

.current {
  border-bottom: solid 5px #42b883;
  transition: border-width 0.6s linear;
  width: 106px;
}
</style>
