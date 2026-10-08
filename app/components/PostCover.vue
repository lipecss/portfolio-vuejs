<template>
  <div class="pcover" :class="`pcover--${size}`" :style="{ background: coverColor(n) }">
    <div class="cover pcover__dots" />
    <span class="cover pcover__n">{{ padN(n) }}</span>
    <slot />
  </div>
</template>

<script setup>
import { coverColor, padN } from '~/data/posts'

defineProps({
  n: { type: Number, required: true },
  // card (16/9) · compact (16/7) · wide (destaque) · hero (4/5)
  size: { type: String, default: 'card' }
})
</script>

<style scoped>
.pcover {
  position: relative;
  overflow: hidden;
  color: var(--arc-bg);
}

.pcover__dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(var(--arc-bg) 1.6px, transparent 1.8px);
  background-size: 18px 18px;
  opacity: 0.3;
}

.pcover__n {
  position: absolute;
  right: 8px;
  bottom: -28px;
  font-size: 150px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.06em;
}

.pcover--card {
  aspect-ratio: 16 / 9;
}

.pcover--compact {
  aspect-ratio: 16 / 7;
}

.pcover--compact .pcover__n {
  font-size: 130px;
  bottom: -26px;
}

.pcover--wide {
  flex: 1 1 440px;
  min-height: 360px;
}

.pcover--wide .pcover__dots,
.pcover--hero .pcover__dots {
  background-image: radial-gradient(var(--arc-bg) 2px, transparent 2.2px);
  background-size: 22px 22px;
}

.pcover--wide .pcover__dots {
  opacity: 0.35;
}

.pcover--wide .pcover__n {
  right: -10px;
  bottom: -40px;
  font-size: 280px;
}

.pcover--hero {
  flex: 1 1 340px;
  max-width: 460px;
  aspect-ratio: 4 / 5;
  border-radius: 10px;
  box-shadow: 10px 10px 0 var(--arc-acc);
}

.pcover--hero .pcover__n {
  right: -6px;
  bottom: -48px;
  font-size: 300px;
}
</style>
