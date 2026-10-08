<template>
  <div class="container">
    <div v-for="image in images" :key="image" class="card">
      <NuxtImg 
        :src="image.url || image"
        quality="80"
        loading="lazy"
        width="500" 
        alt=""
        format="webp"
        sizes="sm:100vw md:100vw lg:100vw"
      />
      <div class="card__head">{{ image.description || '' }}</div>
    </div>
  </div>
</template>

<script setup>
const porps = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  min-height: 100vh;
  background: #000;
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  overflow: hidden;
  width: 90%;
  transform: skew(5deg);

  .card {
    flex: 1;
    transition: all 1s ease-in-out;
    height: 75vmin;
    position: relative;
    .card__head {
      color: black;
      background: var(--g1);
      padding: 0.5em;
      transform: rotate(-90deg);
      transform-origin: 0% 0%;
      transition: all 0.5s ease-in-out;
      min-width: 100%;
      text-align: center;
      position: absolute;
      bottom: 0;
      left: 0;
      font-size: 1em;
      white-space: nowrap;
    }

    &:hover {
      flex-grow: 10;
      img {
        filter: grayscale(0);
      }
      .card__head {
        text-align: center;
        top: calc(100% - 2em);
        color: white;
        background: rgba(0, 0, 0, 0.713);
        font-size: 2em;
        transform: rotate(0deg) skew(-5deg);
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 1s ease-in-out;
      filter: grayscale(100%);
    }
    &:not(:nth-child(5)) {
      margin-right: 1em;
    }
  }
}

</style>
