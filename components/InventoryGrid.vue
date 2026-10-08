<template>
  <section id="inventario" class="inv">
    <div class="arc-wrap inv__inner">
      <div class="inv__head">
        <div class="inv__title">
          <span class="arc-eyebrow">02 · INVENTÁRIO</span>
          <h2 class="arc-h2">Itens equipados</h2>
        </div>
        <div class="inv__tabs" role="group" aria-label="Filtrar itens por categoria">
          <button v-for="tab in inventoryTabs" :key="tab.id" type="button" class="inv__tab"
            :class="{ 'inv__tab--on': current === tab.id }" :aria-pressed="current === tab.id" @click="current = tab.id">
            {{ tab.label }}
          </button>
        </div>
      </div>

      <div class="inv__grid">
        <div v-for="item in items" :key="item.name" class="slot inv__slot">
          <span class="inv__cat">{{ item.cat }}</span>
          <span class="inv__name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { inventory, inventoryTabs } from '~/data/home'

const current = ref('tudo')
const items = computed(() => (current.value === 'tudo' ? inventory : inventory.filter((it) => it.cat === current.value)))
</script>

<style scoped>
.inv {
  background: var(--arc-panel);
}

.inv__inner {
  padding-top: 112px;
  padding-bottom: 112px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.inv__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
}

.inv__title {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.inv__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.inv__tab {
  height: 40px;
  padding: 0 14px;
  border-radius: 4px;
  font-family: var(--arc-mono);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 2px solid var(--arc-line-soft);
  background: transparent;
  color: var(--arc-ink);
}

.inv__tab--on {
  border-color: var(--arc-acc);
  background: var(--arc-acc);
  color: var(--arc-bg);
}

.inv__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

.inv__slot {
  aspect-ratio: 1 / 1;
  background: var(--arc-bg);
  border: 2px solid var(--arc-line);
  border-radius: 6px;
  padding: 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.inv__cat {
  font-family: var(--arc-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--arc-dim);
}

.inv__name {
  font-size: 21px;
  font-weight: 600;
  line-height: 1.1;
}
</style>
