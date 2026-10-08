<template>
  <section id="log" class="log">
    <div class="arc-wrap log__inner">
      <div class="log__intro">
        <span class="arc-eyebrow">04 · DIÁRIO DE BORDO</span>
        <h2 class="arc-h2">Posts</h2>
        <p class="log__lead">Linhas de código, aventuras de jogo e o que aprendo no caminho.</p>
        <NuxtLink to="/post" class="log__all">TODAS AS QUESTS →</NuxtLink>
      </div>

      <div class="log__list">
        <NuxtLink v-for="(post, i) in posts" :key="post.slug" :to="`/post/${post.slug}`" class="row log__row">
          <span class="log__n">&gt; {{ String(i + 1).padStart(2, '0') }}</span>
          <span class="log__title">{{ post.title }}</span>
          <span class="log__arrow" aria-hidden="true">→</span>
        </NuxtLink>
        <NuxtLink v-if="!posts.length" to="/post" class="row log__row">
          <span class="log__n">&gt; --</span>
          <span class="log__title">Ver todas as postagens</span>
          <span class="log__arrow" aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// Os posts vêm da API (Mongo). Se ela falhar, a lista só fica vazia e o link "TODAS AS QUESTS" continua valendo.
const { data } = await useFetch('/api/posts/latest', { server: false, lazy: true, default: () => [] })

const posts = computed(() => (Array.isArray(data.value) ? data.value.filter((p) => p?.slug && p?.title) : []))
</script>

<style scoped>
.log {
  border-top: 2px solid var(--arc-line);
}

.log__inner {
  padding-top: 112px;
  padding-bottom: 112px;
  display: flex;
  flex-wrap: wrap;
  gap: 56px;
}

.log__intro {
  flex: 1 1 280px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.log__lead {
  margin: 0;
  font-size: 18px;
  line-height: 1.55;
  color: var(--arc-soft);
  max-width: 32ch;
}

.log__all {
  align-self: flex-start;
  margin-top: 8px;
  font-family: var(--arc-mono);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--arc-acc) !important;
}

.log__list {
  flex: 999 1 560px;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.log__row {
  text-decoration: none;
  display: flex;
  align-items: baseline;
  gap: 20px;
  padding: 24px 0;
  border-bottom: 2px solid var(--arc-line);
}

.log__n {
  font-family: var(--arc-mono);
  font-size: 13px;
  color: var(--arc-acc);
  flex-shrink: 0;
}

.log__title {
  flex: 1 1 auto;
  font-size: clamp(20px, 2.2vw, 28px);
  line-height: 1.25;
}

.log__arrow {
  font-family: var(--arc-mono);
  font-size: 18px;
}
</style>
