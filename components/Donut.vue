<template>
  <div class="donut">
    <div class="flex justify-center insider">
      <ClientOnly>
        <vc-donut v-bind="localProps" :size="size" :background="background" :foreground="foreground">
          <span :style="`color: ${sectionColor}`">{{ value }}</span>
        </vc-donut>
      </ClientOnly>
    </div>
    <p class="text-center" :style="`color: ${sectionColor}`">{{ text }}</p>
  </div>
</template>

<script setup>
import 'vue-css-donut-chart/dist/vcdonut.css'

const props = defineProps({
  text: { type: String, default: '' },
  size: { type: Number, default: 95 },
  value: { type: String },
  sectionColor: { type: String, default: '#41b883' },
  background: { type: String, default: '#101010' },
  foreground: { type: String, default: 'gray' }
})

const isChartsUpdated = ref(false)
const localProps = ref({
  sections: [{ value: 0, color: props.sectionColor }],
  thickness: 30
})

const onScroll = () => {
  const data = document.getElementsByClassName('donut')[0]

  const rect = data.getBoundingClientRect()

  const isInViewport = rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight ||
    document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth)

  if (isInViewport && !isChartsUpdated.value) {

    updateChart()
  }
}

const updateChart = () => {
  const section = localProps.value.sections[0]
  section.value = 0
  isChartsUpdated.value = true

  const timer = setInterval(() => {

    section.value += 10

    if (section.value === 100) {
      clearInterval(timer)
    }
  }, 150)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style lang="scss" scoped>
.donut {
    margin: 53px 0;

  .insider {
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


