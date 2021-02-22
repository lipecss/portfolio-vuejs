<template>
  <b-navbar toggleable="lg" :class="{ change_color: scrollPosition > 50 }" :sticky=true>
    <b-navbar-toggle target="nav_collapse" class="navbar-dark"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item
        class="navss"
        :class="{ current: (content.id === currentNav )}"
        v-for="content in navContent"
        :key="content.name"
        @click="findItem(content.id)">
          {{content.name}}
        </b-nav-item>
      </b-navbar-nav>
      <button class="login ml-auto"><router-link to="login">Login</router-link></button>
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
      currentNav: 'home',
      navContent: [
        { name: 'Home', id: 'home' },
        { name: 'About', id: 'about' },
        { name: 'Skills', id: 'skill' },
        { name: 'Portfolio', id: 'portfolio' },
        { name: 'Blog', id: 'blog' },
        { name: 'Contact', id: 'contact' }
      ]
    }
  },
  props: {},
  computed: {},
  methods: {
    updateScroll (e) {
      this.scrollPosition = window.scrollY
      const currentPage = this.$router.currentRoute.path

      if (currentPage === '/') {
        if (window.scrollY >= 0 && window.scrollY <= 543) this.currentNav = 'home'
        else if (window.scrollY > 543 && window.scrollY <= 1375) this.currentNav = 'about'
        else if (window.scrollY > 1376 && window.scrollY <= 2236) this.currentNav = 'skill'
        else if (window.scrollY > 2238 && window.scrollY <= 3488) this.currentNav = 'portfolio'
        else if (window.scrollY > 3489 && window.scrollY <= 4823) this.currentNav = 'blog'
        else this.currentNav = 'contact'
      }
    },
    findItem (item) {
      const el = document.getElementById(item)
      el.scrollIntoView({ behavior: 'smooth' })
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
  border-bottom: solid 5px $vue-green;
  transition: border-width 0.6s linear;
  width: 106px;
}

.login {
  padding: 0 23px;
  height: 40px;
  line-height: 34px;
  border: 2px solid $vue-green;
  background: transparent;
  border-radius: 4px;
  font-size: 14px;
  text-transform: uppercase;
  transition: .3s;

  a { color: $default-green }

  &:hover {
    background: $vue-green;
    color: #fff;
    box-shadow: 0 10px 15px 0 rgb(0 0 0 / 10%);
    transform: translateY(-5px);
    a {
      color: #fff;
    }
  }
}
</style>
