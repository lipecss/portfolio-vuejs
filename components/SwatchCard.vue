<template>
  <div class="item switch" v-if="imgUrl">
    <div class="color flex justify-center items-center h-screen" :style="[currentColor]">
      <NuxtImg 
        :src="imgUrl"
        class="w-6 md:w-10"
        width="40"
        height="40"
        :alt="name" :title="name"
        format="webp"
        quality="80"
        loading="lazy"
        sizes="sm:100vw md:100vw lg:100vw"
      />
      <span class="text-xs md:text-sm font-thin">{{ name }}</span>
    </div>
  </div>
</template>

<script setup>
// props
const props = defineProps({
  color: { type: String, required: true },
  name: { type: String, required: true },
  imgUrl: { type: String, default: '' }
})

const currentColor = computed(() => {
  return `background: ${props.color}`
})
</script>

<style lang="scss" scoped>

.item:hover {
  width: 98px !important;
  height: 98px !important;
  margin: calc((100% - (100px * 4)) / 8) !important;
  transform-origin: center !important;
  transform: scale(1.6) !important;
  z-index: 1 !important;
}

.color {
  position: relative;
  width: 100%;
  height: 100%;
}

.color>* {
  position: absolute;
}
.color span {
  position: absolute;
  top: 100%;
  left: 60%;
  color: black;
  transform: translateX(-50%);
  opacity: 0;
  transition: top 0.3s ease, opacity 0.3s ease, 0s;
}

.item:not(:hover) .color span { /* Define as propriedades quando o .item não está em hover */
  top: 100%;
  opacity: 0;
  transition: top 0.3s ease; /* Define um delay maior para a transição de opacity */
}

.item:hover .color span {
  top: 76%;
  opacity: 1;
}


.color img {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.item:hover img  {
  opacity: 1;
}

@media (max-width: 767px) {
  .item:hover {
    width: 68px;
    height: 68px;
    margin: calc((100% - (68px * 4)) / 8);
    transform-origin: center;
    transform: scale(1.6);
  }
}

@media (min-width: 768px) {
  .item:hover {
    width: 98px;
    height: 98px;
    transform: scale(1.6);
  }
}
</style>
