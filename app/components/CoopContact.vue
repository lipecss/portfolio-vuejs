<template>
  <section id="coop" class="arc-wrap coop">
    <div class="coop__text">
      <span class="arc-eyebrow">06 · MODO CO-OP</span>
      <h2 class="coop__title">Player 2,<br>entra aí.</h2>
      <p class="coop__lead">Disponível para trabalho autônomo. Manda o convite que eu respondo rapidinho.</p>
    </div>

    <div class="coop__card">
      <span class="coop__label">E-MAIL</span>
      <a :href="`mailto:${email}`" class="coop__email">{{ email }}</a>
      <div class="coop__actions">
        <button type="button" class="press arc-btn arc-btn--solid coop__copy" @click="copy">
          {{ copied ? 'Copiado!' : 'Copiar e-mail' }}
        </button>
        <a :href="`mailto:${email}`" class="press arc-btn arc-btn--ghost">ENVIAR E-MAIL</a>
      </div>
      <p class="coop__status" role="status" aria-live="polite">
        <template v-if="failed">Não consegui copiar. Selecione o e-mail acima e copie manualmente.</template>
      </p>
    </div>
  </section>
</template>

<script setup>
const email = useRuntimeConfig().public.contactEmail

const copied = ref(false)
const failed = ref(false)
let timer = null

const copy = async () => {
  failed.value = false
  try {
    await navigator.clipboard.writeText(email)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => { copied.value = false }, 2000)
  } catch (e) {
    failed.value = true
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
.coop {
  padding-top: 112px;
  padding-bottom: 80px;
  display: flex;
  flex-wrap: wrap;
  gap: 56px;
}

.coop__text {
  flex: 999 1 520px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.coop__title {
  margin: 0;
  font-weight: 700;
  font-size: clamp(56px, 9vw, 136px);
  line-height: 0.88;
  letter-spacing: -0.05em;
  text-shadow: 5px 5px 0 var(--arc-acc);
}

.coop__lead {
  margin: 0;
  font-size: 20px;
  line-height: 1.55;
  color: var(--arc-soft);
  max-width: 40ch;
}

.coop__card {
  flex: 1 1 360px;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 28px;
  border: 2px solid var(--arc-line-soft);
  border-radius: 10px;
  background: var(--arc-panel);
  box-shadow: 8px 8px 0 var(--arc-line);
  min-width: 0;
}

.coop__label {
  font-family: var(--arc-mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--arc-dim);
}

.coop__email {
  font-size: clamp(22px, 2.4vw, 32px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--arc-yel) !important;
  overflow-wrap: anywhere;
  user-select: all;
}

.coop__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.coop__copy {
  min-width: 170px;
}

.coop__status {
  margin: 0;
  min-height: 1.2em;
  font-family: var(--arc-mono);
  font-size: 12px;
  color: var(--arc-pink);
}
</style>
