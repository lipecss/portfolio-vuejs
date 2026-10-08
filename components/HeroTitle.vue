<template>
  <section id="start" class="arc-wrap hero">
    <div class="hero__title">
      <span class="blink hero__coin">▶ INSERT COIN</span>
      <h1 aria-label="Felipe" class="hero__name">
        <span v-for="(letter, i) in letters" :key="i" class="jl" aria-hidden="true">{{ letter }}</span>
      </h1>
    </div>
    <div class="hero__side">
      <p class="hero__lead">
        Engenheiro de software, professor e eterno estudante. Classe: dev full stack. Arma favorita: Vue + Nuxt.
      </p>
      <div class="hero__cta">
        <a href="#missoes" class="press arc-btn arc-btn--solid">VER MISSÕES →</a>
        <a v-if="cvUrl" :href="cvUrl" class="press arc-btn arc-btn--ghost" target="_blank" rel="noopener">CARREGAR CV</a>
        <span v-else class="arc-btn arc-btn--ghost" role="link" aria-disabled="true" title="Em breve">CARREGAR CV</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { links } from '~/data/home'

const letters = ['F', 'e', 'l', 'i', 'p', 'e']
const cvUrl = links.cv
</script>

<style scoped>
.hero {
  padding-top: clamp(40px, 6vw, 80px);
  padding-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
}

.hero__title {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
}

.hero__coin {
  font-family: var(--arc-mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--arc-yel);
}

.hero__name {
  margin: 0;
  font-weight: 700;
  font-size: clamp(80px, 14vw, 216px);
  line-height: 0.84;
  letter-spacing: -0.05em;
  text-shadow: 6px 6px 0 var(--arc-acc), 12px 12px 0 var(--arc-lil);
}

.hero__side {
  flex: 0 1 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 12px;
}

.hero__lead {
  margin: 0;
  font-size: clamp(19px, 1.8vw, 24px);
  line-height: 1.4;
  font-weight: 300;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
