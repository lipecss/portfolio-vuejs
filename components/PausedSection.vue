<template>
  <section class="paused">
    <div class="arc-wrap paused__inner">
      <div class="paused__text">
        <span class="paused__kicker">05 · PAUSADO</span>
        <p>Fora do editor, estou no Valorant ou navegando no Sea of Thieves.</p>
      </div>
      <div class="paused__links">
        <template v-for="item in items" :key="item.label">
          <a v-if="item.url" :href="item.url" class="row paused__link" target="_blank" rel="noopener">
            <span>{{ item.label }}</span><span aria-hidden="true">↗</span>
          </a>
          <span v-else class="paused__link paused__link--off" aria-disabled="true" title="Em breve">
            <span>{{ item.label }}</span><span aria-hidden="true">↗</span>
          </span>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { links } from '~/data/home'

const items = [
  { label: 'TWITCH', url: links.twitch },
  { label: 'GITHUB', url: links.github },
  { label: 'XBOX', url: links.xbox },
  { label: 'TRILHA SONORA', url: links.music }
]
</script>

<style scoped>
.paused {
  background: var(--arc-lil);
  color: var(--arc-bg);
}

.paused__inner {
  padding-top: 96px;
  padding-bottom: 96px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 48px;
}

.paused__text {
  flex: 999 1 480px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.paused__kicker {
  font-family: var(--arc-mono);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.paused__text p {
  margin: 0;
  font-size: clamp(32px, 4vw, 56px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.03em;
}

.paused__links {
  flex: 1 1 280px;
  display: flex;
  flex-direction: column;
  font-family: var(--arc-mono);
  font-weight: 800;
}

.paused__link {
  text-decoration: none;
  color: var(--arc-bg) !important;
  display: flex;
  justify-content: space-between;
  padding: 18px 0;
  border-bottom: 2px solid var(--arc-bg);
  font-size: 17px;
}

.paused__link:last-child {
  border-bottom: 0;
}

.paused__link--off {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
