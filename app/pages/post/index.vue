<template>
  <div>
    <section class="arc-wrap plist-head">
      <div class="plist-head__title">
        <nav class="crumbs" aria-label="Trilha"><NuxtLink to="/">INÍCIO</NuxtLink> / DIÁRIO DE BORDO</nav>
        <h1 class="plist-head__h1">Diário<br>de bordo</h1>
      </div>
      <p class="plist-head__lead">Linhas de código, aventuras de jogo e o que aprendo no caminho. Cada post é uma quest.</p>
    </section>

    <section class="arc-wrap filters">
      <div class="filters__tabs" role="group" aria-label="Filtrar por categoria">
        <button v-for="tab in tabs" :key="tab" type="button" class="filters__tab"
          :class="{ 'filters__tab--on': current === tab }" :aria-pressed="current === tab" @click="select(tab)">
          {{ tab }}
        </button>
      </div>
      <label class="filters__search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"
          stroke-linecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span class="sr-only">Buscar posts</span>
        <input v-model="query" type="search" placeholder="Buscar quest…" @input="shown = pageSize">
      </label>
    </section>

    <section v-if="featured" class="arc-wrap featured">
      <NuxtLink :to="`/post/${featured.slug}`" class="lift featured__card">
        <PostCover :n="featured.n" size="wide">
          <span class="featured__badge">NOVA QUEST</span>
        </PostCover>
        <div class="featured__body">
          <div class="featured__text">
            <span class="featured__tag">{{ postTag(featured.title) }}</span>
            <span class="featured__title">{{ featured.title }}</span>
            <span class="featured__excerpt">{{ featured.excerpt }}</span>
          </div>
          <div class="featured__meta">
            <span>{{ formatPostDate(featured.created_at) }} · {{ featured.readMin }} MIN</span>
            <span class="featured__likes">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 21s-7.5-4.6-9.5-9.2C1 8.3 3.2 5 6.6 5c2 0 3.6 1.1 5.4 3 1.8-1.9 3.4-3 5.4-3 3.4 0 5.6 3.3 4.1 6.8C19.5 16.4 12 21 12 21Z" />
              </svg>{{ featured.likes }}
            </span>
          </div>
        </div>
      </NuxtLink>
    </section>

    <section class="arc-wrap grid-area">
      <div v-if="visible.length" class="grid-area__grid">
        <PostCard v-for="post in visible" :key="post.slug" :post="post" />
      </div>
      <p v-if="!filtered.length" class="grid-area__empty">Nenhuma quest nessa categoria ainda.</p>
      <button v-if="hasMore" type="button" class="press grid-area__more" @click="shown += pageSize">
        CARREGAR MAIS QUESTS
      </button>
    </section>
  </div>
</template>

<script setup>
import getSiteMeta from '~/utils/getSiteMeta'
import { formatPostDate, postTag, tagOrder } from '~/data/posts'

definePageMeta({ layout: 'arcade' })

const config = useRuntimeConfig()
const pageSize = 6

const { data } = await useFetch('/api/posts/summaries', { default: () => [] })
const posts = computed(() => (Array.isArray(data.value) ? data.value : []))

const current = ref('TUDO')
const query = ref('')
const shown = ref(pageSize)

// Abas só para as categorias que existem.
const tabs = computed(() => ['TUDO', ...tagOrder.filter((tag) => posts.value.some((p) => postTag(p.title) === tag))])

const filtered = computed(() => {
  const term = query.value.trim().toLowerCase()

  return posts.value.filter((p) => {
    if (current.value !== 'TUDO' && postTag(p.title) !== current.value) return false
    return !term || p.title.toLowerCase().includes(term)
  })
})

// O destaque é o post mais novo, só na visão sem filtro nem busca.
const featured = computed(() => (current.value === 'TUDO' && !query.value.trim() ? filtered.value[0] : null))
const rest = computed(() => (featured.value ? filtered.value.slice(1) : filtered.value))
const visible = computed(() => rest.value.slice(0, shown.value))
const hasMore = computed(() => rest.value.length > shown.value)

const select = (tab) => {
  current.value = tab
  shown.value = pageSize
}

useHead({
  title: 'Felipecss - Diário de bordo',
  meta: getSiteMeta({
    type: 'website',
    title: 'Listando minhas postagens',
    description: 'Seja bem-vindo ao meu blog! Aqui, compartilho minhas paixões por programação e jogos, trazendo sempre conteúdos interessantes e divertidos para você.',
    url: `${config.public.baseUrl}/post`
  })
})
</script>

<style scoped>
.crumbs {
  font-family: var(--arc-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--arc-dim);
}

.crumbs a {
  color: var(--arc-dim);
  text-decoration: none;
}

.plist-head {
  padding-top: clamp(48px, 7vw, 96px);
  padding-bottom: 48px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
}

.plist-head__title {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.plist-head__h1 {
  margin: 0;
  font-weight: 700;
  font-size: clamp(64px, 10vw, 152px);
  line-height: 0.86;
  letter-spacing: -0.05em;
  text-shadow: 6px 6px 0 var(--arc-acc), 12px 12px 0 var(--arc-lil);
}

.plist-head__lead {
  flex: 0 1 380px;
  margin: 0;
  font-size: 20px;
  line-height: 1.5;
  font-weight: 300;
  color: var(--arc-soft);
}

.filters {
  padding-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.filters__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filters__tab {
  height: 44px;
  padding: 0 16px;
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

.filters__tab--on {
  border-color: var(--arc-acc);
  background: var(--arc-acc);
  color: var(--arc-bg);
}

.filters__search {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  padding: 0 14px;
  border: 2px solid var(--arc-line-soft);
  border-radius: 4px;
  background: var(--arc-panel);
  flex: 0 1 320px;
  font-family: var(--arc-mono);
  font-size: 13px;
  color: var(--arc-dim);
}

.filters__search input {
  flex: 1 1 auto;
  min-width: 0;
  height: 100%;
  background: transparent;
  border: 0;
  outline: none;
  color: var(--arc-ink);
  font-family: inherit;
  font-size: 13px;
}

.filters__search:focus-within {
  border-color: var(--arc-yel);
}

.filters__search input::placeholder {
  color: #8a8499;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

.featured {
  padding-bottom: 48px;
}

.featured__card {
  text-decoration: none;
  display: flex;
  flex-wrap: wrap;
  border: 2px solid var(--arc-line);
  border-radius: 10px;
  overflow: hidden;
  background: var(--arc-panel);
}

.featured__badge {
  position: absolute;
  left: 24px;
  top: 24px;
  font-family: var(--arc-mono);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  padding: 6px 10px;
  background: var(--arc-bg);
  color: var(--arc-acc);
  border-radius: 4px;
}

.featured__body {
  flex: 999 1 420px;
  padding: clamp(28px, 4vw, 48px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 28px;
  box-sizing: border-box;
}

.featured__text {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.featured__tag {
  font-family: var(--arc-mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--arc-lil);
}

.featured__title {
  font-size: clamp(32px, 3.6vw, 52px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--arc-ink);
}

.featured__excerpt {
  font-size: 18px;
  line-height: 1.55;
  color: var(--arc-soft);
}

.featured__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-family: var(--arc-mono);
  font-size: 13px;
  color: var(--arc-dim);
}

.featured__likes {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--arc-pink);
}

.grid-area {
  padding-bottom: 96px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.grid-area__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.grid-area__empty {
  margin: 0;
  text-align: center;
  font-family: var(--arc-mono);
  font-size: 14px;
  color: var(--arc-dim);
}

.grid-area__more {
  align-self: center;
  height: 52px;
  padding: 0 28px;
  background: transparent;
  color: var(--arc-ink);
  border: 2px solid var(--arc-ink);
  border-radius: 4px;
  font-family: var(--arc-mono);
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.06em;
  cursor: pointer;
}
</style>
