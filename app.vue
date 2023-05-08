<template>
  <Navbar />
  <NuxtLayout>
    <NuxtPage :key="$route.fullPath"/>
  </NuxtLayout>
</template>
