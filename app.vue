<template>
  <!-- A home tem o próprio HUD; o menu antigo continua nas demais páginas. -->
  <Navbar v-if="$route.path !== '/'" />
  <NuxtLayout>
    <NuxtPage :key="$route.fullPath"/>
  </NuxtLayout>
</template>
