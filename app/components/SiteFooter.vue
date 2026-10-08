<template>
  <footer class="foot">
    <div class="arc-wrap foot__inner">
      <span>© {{ new Date().getFullYear() }} FELIPECSS · SAVE AUTOMÁTICO</span>
      <span>GAME OVER? NUNCA.</span>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  border-top: 2px solid var(--arc-line);
}

.foot__inner {
  padding-top: 24px;
  padding-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  font-family: var(--arc-mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--arc-dim);
}
</style>
