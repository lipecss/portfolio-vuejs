<template>
  <div class="horizontal-chart">
    <div class="horizontal-chart-container">
      <div class="items" v-for="(item, index) in items" :key="index">
        <div class="tag">{{item.name}}</div>
        <div class="fill" style="width: 0">fill</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseHorizontalChart',
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
      isChartsUpdated: false
    }
  },
  props: {
    items: { type: Array, required: false }
  },
  computed: {},
  methods: {
    onScroll (element) {
      const data = document.getElementsByClassName('items')[0]
      const rect = data.getBoundingClientRect()
      const isInViewport = rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight ||
        document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      if (isInViewport && !this.isChartsUpdated) this.updateChart()
    },
    updateChart (item) {
      const divs = document.getElementsByClassName('fill')
      this.isChartsUpdated = true

      divs.forEach((element, index) => {
        var width = 10
        const max = this.items[index].width
        const time = this.items[index].timer

        const id = setInterval(function () {
          width++

          if (width === max) {
            clearInterval(id)
          }
          element.style.width = width + '%'
        }, time)
      })
    }
  },
  filters: {},
  watch: {}
}
</script>

<style lang="scss" scoped>

.horizontal-chart {
  .items {
    height: 28px;
    margin: 0 0 15px;
    font-size: 11px;
    display: flex;
    max-width: 100%;
    background-color: #272525;
    position: relative;
    overflow: hidden;

    .tag {
      background-color: #1f1f1f;
      color: #fff;
      height: 100%;
      width: 110px;
      display: flex;
      text-transform: uppercase;
      justify-content: center;
      align-items: center;
      z-index: 25;
    }

    .fill {
      background: $vue-green;
      height: 28px;
      z-index: 20;
    }
  }

  .items .fill, .items .tag {
    top: 0;
    left: 0;
    position: absolute;
  }
}
</style>
