<template>
  <div class="tickwrap ticker" aria-hidden="true">
    <div class="tick">
      <span v-for="(item, i) in loop" :key="i" class="ticker__item">
        {{ item }}<span class="ticker__dot" />
      </span>
    </div>
  </div>
</template>

<script setup>
import { ticker } from '~/data/home'

// Duas cópias da lista: a animação desliza -50% e recomeça sem salto.
const loop = [...ticker, ...ticker]
</script>

<style scoped>
.ticker {
  background: var(--arc-acc);
  color: var(--arc-bg);
  border-top: 3px solid var(--arc-bg);
  border-bottom: 3px solid var(--arc-bg);
}

.ticker__item {
  display: inline-flex;
  align-items: center;
  gap: 28px;
  padding: 18px 14px;
  font-size: clamp(22px, 2.6vw, 34px);
  font-weight: 700;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.ticker__dot {
  width: 14px;
  height: 14px;
  background: var(--arc-bg);
  transform: rotate(45deg);
}
</style>
