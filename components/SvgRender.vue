<template>
  <div class="relative svg-render h-24 w-20 text-white bg-white">
    <div class="skill-logo h-24 w-20 flex items-center justify-center p-2" v-html="icon" />
  </div>
</template>

<script setup>
const props = defineProps({ icon: String })
</script>


<style lang="scss">
.skill-logo svg {
  width: 100% !important;
  height: 100% !important;
}
</style>
