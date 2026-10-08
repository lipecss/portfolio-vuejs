<template>
  <div class="arcade">
    <HudNav :reading="Boolean($route.meta.reading)" />
    <main>
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
