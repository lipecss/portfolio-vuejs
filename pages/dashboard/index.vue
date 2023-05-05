<template>
  <div class="inner-container my-0">
    <h2 class="text-3xl">Bem vindo <span class="font-bold text-4xl">Felipecss</span></h2>

  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})
</script>
