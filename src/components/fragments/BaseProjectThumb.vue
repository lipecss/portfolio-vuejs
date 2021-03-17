<template>
  <div class="project-thumbnail" :style="style" @mouseenter="changeHover" @mouseleave="changeHover">
    <div class="project-thumbnail__iner">
      <div class="project-thumbnail__iner-content">
        <h2>{{data.name}}</h2>
        <div class="project-thumbnail__iner-content-action" :class="{ visible: isHover }">
          <router-link :to="`/blog/${data.slug}`" class="">{{ $t('buttons.readMore')}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseProjectThumb',
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
      const img = this.data.images[0]
      return {
        position: 'relative',
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
.project-thumbnail {
  min-height: 400px;
  opacity: 1;

  &__iner {
    z-index: 9;
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    bottom: 20px;

    &:hover {
      cursor: default;
    }

    &-content {
      &-action {
        padding: 0 23px;
        height: 40px;
        width: 124px;
        margin: 0 auto;
        line-height: 34px;
        border: 2px solid $vue-green;
        background: transparent;
        border-radius: 4px;
        font-size: 14px;
        text-transform: uppercase;
        transition: .3s;
        color: $default-green;

        &:hover {
          background: $vue-green;
          color: #fff;
          cursor: default;
          box-shadow: 0 10px 15px 0 rgb(0 0 0 / 10%);
          transform: translateY(-5px);
          a {
            color: #fff;
          }
        }
      }
    }
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.08) translateZ(0);
    transition: transform .40s ease;
    &::before {
      background-color: #42b883;
      background-image: linear-gradient(#42b883 10%, #000);
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 5;
      opacity: 0.684;
      transition: all .40s ease;
      border-radius: 6px;
    }
  }
  @media screen and (min-width: 1400px) {
    min-height: 500px;
  }
}
</style>
