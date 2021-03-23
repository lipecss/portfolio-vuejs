<template>
  <div class="post-thumbnail" :style="style" @mouseenter="changeHover" @mouseleave="changeHover">
    <div class="content">
      <h2>{{data.title}}</h2>
      <div class="btn-post" :class="{ visible: isHover }">
        <router-link :to="`/blog/${data.slug}`" class="">{{ $t('buttons.readMore')}}</router-link>
      </div>
    </div>
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
      isHover: false
    }
  },
  props: {
    data: {
      type: [Object, Array]
    }
  },
  computed: {
    style () {
      const img = this.data.img
      return {
        position: 'relative',
        height: '400px',
        borderRadius: '6px',
        backgroundImage: `linear-gradient(rgba(49,46,46, 0.63), rgba(82,77,72, 0.72)), url(${img})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
      }
    }
  },
  methods: {
    changeHover () {
      this.isHover = !this.isHover
    }
  },
  filters: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.post-thumbnail:hover {
  .content {
    bottom: 80%;
    transform: translateY(100%)
  }
}

.content {
  position: absolute;
  bottom: 24px;
  position: absolute;
  width: 100%;
  padding: 50px 35px;
  z-index: 3;
  transition: all .3s ease;
}

.btn-post {
  margin-top: 35px;
  opacity: 0;
  visibility: hidden;

  a {
    color: $vue-green
  }
}

.visible {
  margin-top: 35px;
  transition: 0.7s;
  opacity: 1;
  padding: 0 23px;
  height: 40px;
  display: inline-block;
  line-height: 34px;
  border: 2px solid $vue-green;
  border-radius: 4px;
  font-size: 14px;
  text-transform: uppercase;
}
</style>
