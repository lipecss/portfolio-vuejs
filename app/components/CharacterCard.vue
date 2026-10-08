<template>
  <section id="personagem">
    <div class="arc-wrap char">
      <div class="float char__card">
        <div class="char__top"><span>P1 · PRONTO</span><span>SP · BR</span></div>
        <NuxtImg src="/contact.png" format="webp" quality="80" width="540" height="570" class="char__photo"
          alt="Foto de Felipe sorrindo, de óculos" sizes="sm:100vw md:420px" />
        <div class="char__id">
          <span class="char__name">Felipe</span>
          <span class="char__class">CLASSE: ENGENHEIRO DE SOFTWARE</span>
        </div>
      </div>

      <div class="char__bio">
        <div class="char__head">
          <span class="arc-eyebrow">01 · SELEÇÃO DE PERSONAGEM</span>
          <h2 class="arc-h2">Eterno estudante.</h2>
        </div>
        <p class="char__text">
          Bacharel em Ciência da Computação, professor e autodidata. Já joguei em várias posições e cenários de negócio —
          cada fase me deu XP novo. Tropeço às vezes, mas sempre passo de fase.
        </p>
        <div class="char__traits">
          <div v-for="t in traits" :key="t.label" class="lift char__trait">
            <span class="char__pip" :style="{ background: t.color }" />
            <span>{{ t.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { traits } from '~/data/home'
</script>

<style scoped>
.char {
  padding-top: 112px;
  padding-bottom: 112px;
  display: flex;
  flex-wrap: wrap;
  gap: 56px;
  align-items: center;
}

.char__card {
  flex: 1 1 320px;
  max-width: 420px;
  background: var(--arc-acc);
  border-radius: 10px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  box-shadow: 10px 10px 0 var(--arc-lil);
  color: var(--arc-bg);
}

.char__top {
  display: flex;
  justify-content: space-between;
  font-family: var(--arc-mono);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.char__photo {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 540 / 570;
  object-fit: cover;
  border-radius: 4px;
  border: 3px solid var(--arc-bg);
  box-sizing: border-box;
}

.char__id {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.char__name {
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.char__class {
  font-family: var(--arc-mono);
  font-size: 13px;
  font-weight: 700;
}

.char__bio {
  flex: 999 1 520px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.char__head {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.char__text {
  margin: 0;
  font-size: 20px;
  line-height: 1.6;
  color: var(--arc-soft);
  max-width: 58ch;
}

.char__traits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.char__trait {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
  border: 2px solid var(--arc-line);
  border-radius: 6px;
  background: var(--arc-bg);
  font-size: 18px;
}

.char__pip {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}
</style>
