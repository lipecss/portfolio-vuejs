<template>
  <transition name="fade">
    <div class="back-home" @click="toHome">
      <span><font-awesome-icon :icon="['fas', 'home']" /></span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TheBackToHome',
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUpdate () {},
  updated () {},
  destroyed () {},
  data () {
    return {
      isActive: false,
      scTimer: 0,
      scY: 0
    }
  },
  props: {},
  computed: {},
  methods: {
    toHome () {
      this.$router.push({ path: '/' })
    }
  },
  filters: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.back-home {
  position: fixed;
  background: #000;
  width: 50px;
  height: 50px;
  top: 50px;
  right: 30px;
  cursor: pointer;
  color: $vue-green;
  font-size: 30px;
  line-height: 51px;
  border-radius: 50%;
  text-align: center;
  z-index: 999;
  &:hover {
    opacity: 0.6;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
