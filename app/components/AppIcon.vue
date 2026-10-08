<template>
  <svg class="app-icon" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path v-for="d in paths[name]" :key="d" :d="d" />
  </svg>
</template>

<script setup>
defineProps({
  name: { type: String, required: true, validator: (v) => ['bars', 'x', 'pencil', 'trash', 'arrows-v'].includes(v) }
})

const paths = {
  bars: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
  x: ['M6 6l12 12', 'M18 6L6 18'],
  pencil: ['M12 20h9', 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z'],
  trash: ['M3 6h18', 'M8 6V4h8v2', 'M6 6l1 14h10l1-14', 'M10 11v6', 'M14 11v6'],
  'arrows-v': ['M12 3v18', 'M8 7l4-4 4 4', 'M8 17l4 4 4-4']
}
</script>

<style scoped>
.app-icon {
  display: inline-block;
  vertical-align: -0.125em;
}
</style>
