<template>
  <section id="missoes" class="arc-wrap mis">
    <div class="mis__head">
      <span class="arc-eyebrow">03 · MISSÕES</span>
      <h2 class="arc-h2">Fases concluídas</h2>
    </div>

    <a :href="mainQuest.url" class="lift mis__main" target="_blank" rel="noopener">
      <div class="mis__main-body">
        <span class="mis__badge">MISSÃO PRINCIPAL · CONCLUÍDA</span>
        <span class="mis__main-name">{{ mainQuest.name }}</span>
        <span class="mis__main-desc">{{ mainQuest.description }}</span>
      </div>
      <div class="mis__loot">
        <span class="mis__loot-title">LOOT</span>
        <div class="mis__tags">
          <span v-for="tag in mainQuest.loot" :key="tag">{{ tag }}</span>
        </div>
      </div>
    </a>

    <div class="mis__grid">
      <component :is="q.url ? 'a' : 'div'" v-for="q in sideQuests" :key="q.n" :href="q.url || undefined"
        :target="q.url ? '_blank' : undefined" :rel="q.url ? 'noopener' : undefined" class="mis__card"
        :class="{ lift: q.url }">
        <div class="mis__thumb">
          <NuxtImg v-if="q.image" :src="q.image" format="webp" loading="lazy" :alt="q.name" />
          <span v-else>[IMAGEM DO PROJETO]</span>
        </div>
        <span class="mis__card-kicker">MISSÃO SECUNDÁRIA {{ q.n }}</span>
        <span class="mis__card-name">{{ q.name }}</span>
      </component>
    </div>
  </section>
</template>

<script setup>
import { mainQuest, sideQuests } from '~/data/home'
</script>

<style scoped>
.mis {
  padding-top: 112px;
  padding-bottom: 112px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.mis__head {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mis__main {
  text-decoration: none;
  display: flex;
  flex-wrap: wrap;
  background: var(--arc-yel);
  color: var(--arc-bg) !important;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 8px 8px 0 var(--arc-acc);
}

.mis__main-body {
  flex: 999 1 480px;
  padding: clamp(28px, 4vw, 48px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
}

.mis__badge {
  align-self: flex-start;
  font-family: var(--arc-mono);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  padding: 6px 10px;
  background: var(--arc-bg);
  color: var(--arc-yel);
  border-radius: 4px;
}

.mis__main-name {
  font-size: clamp(48px, 6vw, 88px);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.04em;
}

.mis__main-desc {
  font-size: 20px;
  line-height: 1.5;
  max-width: 40ch;
}

.mis__loot {
  flex: 1 1 260px;
  padding: clamp(28px, 4vw, 48px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
  box-sizing: border-box;
  border-left: 3px solid var(--arc-bg);
  font-family: var(--arc-mono);
}

.mis__loot-title {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.mis__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
}

.mis__tags span {
  padding: 6px 10px;
  border: 2px solid var(--arc-bg);
  border-radius: 4px;
}

.mis__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.mis__card {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border: 2px solid var(--arc-line);
  border-radius: 10px;
  background: var(--arc-bg);
}

.mis__thumb {
  aspect-ratio: 16 / 10;
  background: var(--arc-panel);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--arc-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: #8a8499;
}

.mis__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mis__card-kicker {
  font-family: var(--arc-mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--arc-lil);
}

.mis__card-name {
  font-size: 24px;
  font-weight: 600;
}
</style>
