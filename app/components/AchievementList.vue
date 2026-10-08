<template>
  <aside class="ach">
    <span class="ach__title">CONQUISTAS {{ trophies }}/{{ total }}</span>
    <div v-for="a in ACHIEVEMENTS" :key="a.id" class="ach__item" :class="{ 'ach__item--on': unlocked[a.id] }">
      <span class="ach__badge">{{ a.icon }}</span>
      <div class="ach__text">
        <span class="ach__name">{{ a.name }}</span>
        <span class="ach__desc">{{ a.desc }}</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
const { unlocked, trophies, total } = useArcade()
</script>

<style scoped>
.ach {
  flex: 1 1 280px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ach__title {
  font-family: var(--arc-mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--arc-lil);
}

.ach__item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  border-radius: 8px;
  border: 2px solid var(--arc-line);
  background: transparent;
  opacity: 0.55;
  transition: all 0.3s ease;
}

.ach__item--on {
  border-color: var(--arc-acc);
  background: var(--arc-panel-hi);
  opacity: 1;
}

.ach__badge {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--arc-mono);
  font-size: 13px;
  font-weight: 800;
  background: var(--arc-line);
  color: #8a8499;
}

.ach__item--on .ach__badge {
  background: var(--arc-acc);
  color: var(--arc-bg);
}

.ach__text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.ach__name {
  font-size: 18px;
  font-weight: 600;
}

.ach__desc {
  font-family: var(--arc-mono);
  font-size: 12px;
  color: var(--arc-dim);
}
</style>
