<template>
  <div class="post-thumbnail" :style="style" @mouseenter="changeHover" @mouseleave="changeHover">
    <div class="content absolute w-full bottom-6">
      <h2>{{ data.title }}</h2>
      <div class="btn-post" :class="{ visible: isHover }">
        Teste
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: { type: [Object, Array] }
})

// data
const isHover = ref(false)

// computed
const style = computed(() => {
  const img = props.data.img

  return {
    position: 'relative',
    height: '400px',
    backgroundImage: `url(${img})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover'
  }
})

// methods

const changeHover = () => {
  isHover.value = !isHover.value
}
</script>


<style lang="scss" scoped>
.post-thumbnail:hover {
  transform: scale(1.04) !important;
  .content {
    bottom: 80%;
    transform: translateY(100%)
  }
}

h2 {
  font-weight: bolder;
    font-size: 44px;
    color: black;
    line-height: 105%;
    letter-spacing: -1px;
    bottom: 0;
    position: absolute;
}

.content {
  padding: 50px 35px;
  z-index: 3;
  transition: all .3s ease;
}

.btn-post {
  margin-top: 35px;
  opacity: 0;
  visibility: hidden;

  a {
    color: var(--g1)
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
  border: 2px solid var(--g1);
  font-size: 14px;
  text-transform: uppercase;
}
</style>
