<template>
  <!-- A home tem o próprio HUD; o menu antigo continua nas demais páginas. -->
  <Navbar v-if="$route.meta.layout !== 'arcade'" />
  <NuxtLayout>
    <NuxtPage :key="$route.fullPath"/>
  </NuxtLayout>
</template>
