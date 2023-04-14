<template>
  <div 
    class="project-card w-full h-full bg-zinc-500 relative overflow-hidden" 
    @mouseenter="toggleShow"
    @mouseleave="showInfo = false">
    <div class="z-50 absolute inset-0 bg-gray-900 opacity-75" />
      <NuxtImg
        format="webp"
        loading="lazy"
        alt="data.name"
        quality="80"
        :src="data.images[0]"
        class="absolute top-0 left-0 w-full h-full object-cover"
        width="800"
        height="800"
        sizes="sm:100vw md:100vw lg:100vw"
      />
    <div 
      v-if="showInfo"
      class="z-50 flex flex-col justify-center colum hover:bg-g1 hover:opacity-75 top-0 left-0 right-0 bottom-0 absolute"
    >
      <p class="text-center mb-10 text-2xl md:text-5xl text-white">{{ data.name }}</p>
      <NuxtLink :to="`/project/${data.slug}`" class="project-card__action hover:cursor-pointer">Leia mais</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { baseUrl } = useRuntimeConfig()

const props = defineProps({
  data: { type: Object }
})

let showInfo = ref(false)

const toggleShow = () => {
  showInfo.value = !showInfo.value
}
</script>

<style lang="scss" scoped>
.project-card {
  position: relative;
  border: 1px solid #000000;
  height: 20rem;
  width: 100%;
  margin: 30px 0;
  transform-origin: top center;
  padding: 5rem;

  &__action {
    padding: 0 23px;
    height: 40px;
    margin: 0 auto;
    line-height: 34px;
    border: 2px solid #ffffff;
    background: transparent;
    border-radius: 4px;
    font-size: 14px;
    text-transform: uppercase;
    transition: .3s;
    color: #ffffff;

    &:hover {
      background: var(--g1);
      box-shadow: 0 10px 15px 0 rgb(0 0 0 / 10%);
      transform: translateY(-5px);

      a {
        color: #fff;
      }
    }
  }
}
</style>
