<template>
  <transition name="fade">
    <div class="back-top" @click="toTop" v-if="isActive">
      <span><font-awesome-icon :icon="['fas', 'sort-up']" /></span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TheBackToTop',
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
    handleScroll: function () {
      if (this.scY > 140) this.isActive = true
      else this.isActive = false

      if (this.scTimer) return
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY
        clearTimeout(this.scTimer)
        this.scTimer = 0
      }, 100)
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  filters: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.back-top {
  position: fixed;
  background: #000;
  width: 50px;
  height: 50px;
  bottom: 50px;
  right: 30px;
  cursor: pointer;
  color: $vue-green;
  font-size: 30px;
  line-height: 59px;
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
