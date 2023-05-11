<template>
  <div class="stream" @mouseenter="changeHover" @mouseleave="changeHover">
    <div class="stream__thumbnail" :style="style">
      <div class="w-full h-full flex flex-col items-center justify-center">
        <h2 class="mb-10 text-center">{{ data.title }}</h2>
        <NuxtLink
          v-if="isHover"
          :to="`/post/${data.slug}`"
          class="button-read-more text-center"
        >
          Leia mais
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
let isHover = ref(false)

const props = defineProps({
  data: { type: Object }
})

const style = computed(() => {
  const img = props.data.img

  return {
    position: 'relative',
    backgroundImage: `linear-gradient(rgba(49,46,46, 0.63), rgba(82,77,72, 0.72)), url(${img})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover'
  }
})

const changeHover = () => {
  isHover.value = !isHover.value
}
</script>

<style lang="scss" scoped>
body {
  overflow: hidden;
}
.stream {
  position: relative;
  display: inline-block;
  background-color: var(--g1);
  height: 50vh;
}

  .stream:before,
  .stream:after {
    content: '';
    display: block;
    background-color: var(--g1);
    width: 8px;
    height: 8px;
    position: absolute;
    transition: all .15s ease;
  }

  .stream:before {
    top: 0;
    left: 0;
    transform-origin: top left;
    transform: rotate(-45deg) scale(0);
  }

  .stream:after {
    right: 0;
    bottom: 0;
    transform-origin: bottom right;
    transform: rotate(45deg) scale(0);
  }

  .stream__thumbnail {
    display: block;
    transform: translate(0, 0);
    transition: all .15s ease;
    position: relative;
    z-index: 10;
    height: 50vh;
  }

.stream:hover .stream__thumbnail {
  transform: translate(6px, -6px);
}

.stream:hover:before {
  transform: rotate(-45deg) scale(1);
}

.stream:hover:after {
  transform: rotate(45deg) scale(1);
}
</style>
