<template>
  <div class="donut">
    <div class="insider">
      <vc-donut v-bind="props" :size="size" :background="background" :foreground="foreground">
        <span :style="`color: ${sectionColor}`">{{ value }}</span>
      </vc-donut>
    </div>
    <p class="text-center" :style="`color: ${sectionColor}`">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'BaseHeroImage',
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeUpdate () {},
  updated () {},
  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
  },
  data () {
    return {
      isChartsUpdated: false,
      props: {
        sections: [
          { value: 0, color: this.sectionColor }
        ],
        thickness: 30
      }
    }
  },
  props: {
    text: { type: String, default: '' },
    size: { type: Number, default: 85 },
    value: { type: String },
    sectionColor: { type: String, default: '#42b883' },
    background: { type: String, default: '#101010' },
    foreground: { type: String, default: 'gray' }
  },
  computed: {},
  methods: {
    onScroll (element) {
      const data = document.getElementsByClassName('donut')[0]
      const rect = data.getBoundingClientRect()
      const isInViewport = rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight ||
        document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      if (isInViewport && !this.isChartsUpdated) this.updateChart()
    },
    updateChart () {
      const section = this.props.sections[0]
      section.value = 0
      this.isChartsUpdated = true

      const timer = setInterval(() => {
        section.value += 10

        if (section.value === 100) {
          clearInterval(timer)
        }
      }, 100)
    }
  },
  filters: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.donut {
    margin: 53px 0;

  .insider {
    display: flex;
    justify-content: center;
    span {
      font-size: 20px;
    }
  }

  p {
    padding-top: 20px;
    font-weight: 300;
    text-transform: uppercase;
  }
}
</style>
