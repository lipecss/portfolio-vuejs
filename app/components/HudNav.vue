<template>
  <header class="hud">
    <nav class="arc-wrap hud__nav" aria-label="Principal">
      <div class="hud__left">
        <NuxtLink to="/" class="hud__brand">FELIPE<span>CSS</span></NuxtLink>
        <div class="hud__stats" aria-live="off">
          <span>SCORE <b class="hud__score">{{ padScore(score) }}</b></span>
          <span>RECORDE <b class="hud__best">{{ padScore(Math.max(best, score)) }}</b></span>
          <span>TROFÉUS <b class="hud__trophy">{{ trophies }}/{{ total }}</b></span>
        </div>
      </div>
      <div class="hud__links">
        <NuxtLink to="/#personagem">PERSONAGEM</NuxtLink>
        <NuxtLink to="/#inventario">INVENTÁRIO</NuxtLink>
        <NuxtLink to="/project">MISSÕES</NuxtLink>
        <NuxtLink to="/post">LOG</NuxtLink>
        <NuxtLink to="/#coop" class="press hud__coop">CO-OP</NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
const { score, best, trophies, total } = useArcade()
</script>

<style scoped>
.hud {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(13, 12, 16, 0.92);
  border-bottom: 2px solid var(--arc-line);
}

.hud__nav {
  padding-top: 14px;
  padding-bottom: 14px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.hud__left {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.hud__brand {
  text-decoration: none;
  font-family: var(--arc-mono);
  font-weight: 800;
  font-size: 18px;
  letter-spacing: 0.04em;
}

.hud__brand span {
  color: var(--arc-acc);
}

.hud__stats {
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: var(--arc-mono);
  font-size: 12px;
  color: var(--arc-dim);
}

.hud__stats b {
  font-weight: 700;
}

.hud__score {
  color: var(--arc-ink);
}

.hud__best {
  color: var(--arc-yel);
}

.hud__trophy {
  color: var(--arc-acc);
}

.hud__links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: clamp(12px, 2.4vw, 28px);
  font-family: var(--arc-mono);
  font-size: 13px;
  letter-spacing: 0.04em;
}

.hud__links a {
  text-decoration: none;
}

.hud__coop {
  height: 40px;
  padding: 0 16px;
  display: inline-flex;
  align-items: center;
  background: var(--arc-acc);
  color: var(--arc-bg) !important;
  border-radius: 4px;
  font-weight: 800;
}
</style>
