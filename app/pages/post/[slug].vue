<template>
  <div>
    <section class="arc-wrap rhero">
      <div class="rhero__text">
        <nav class="crumbs" aria-label="Trilha">
          <NuxtLink to="/">INÍCIO</NuxtLink> / <NuxtLink to="/post">DIÁRIO DE BORDO</NuxtLink> / QUEST #{{ padN(post.n) }}
        </nav>
        <div class="rhero__tags">
          <span class="rhero__quest">QUEST #{{ padN(post.n) }}</span>
          <span class="rhero__tag">{{ tag }}</span>
        </div>
        <h1 class="rhero__title">{{ post.title }}</h1>
        <div class="rhero__by">
          <span class="rhero__author">
            <NuxtImg src="/contact.png" format="webp" width="64" height="64" class="rhero__avatar" alt="" />FELIPECSS
          </span>
          <span>{{ formatPostDate(post.created_at) }}</span>
          <span>{{ post.readMin }} MIN DE LEITURA</span>
          <button type="button" class="like like--pill" :class="{ 'like--on': liked }" :aria-pressed="liked"
            :aria-label="liked ? 'Remover curtida' : 'Curtir post'" @click="toggleLike">
            <svg :key="beat" :class="{ beat: beat > 0 }" width="18" height="18" viewBox="0 0 24 24"
              :fill="liked ? '#ff4f8b' : 'none'" stroke="#ff4f8b" stroke-width="2" aria-hidden="true">
              <path d="M12 21s-7.5-4.6-9.5-9.2C1 8.3 3.2 5 6.6 5c2 0 3.6 1.1 5.4 3 1.8-1.9 3.4-3 5.4-3 3.4 0 5.6 3.3 4.1 6.8C19.5 16.4 12 21 12 21Z" />
            </svg>
            <span>{{ likes }}</span>
          </button>
        </div>
      </div>
      <PostCover :n="post.n" size="hero" class="float">
        <span class="rhero__label">{{ tag }}</span>
      </PostCover>
    </section>

    <section class="arc-wrap rbody">
      <article class="rbody__article">
        <nav v-if="post.toc.length" class="toc" aria-label="Nesta quest">
          <span class="toc__title">NESTA QUEST</span>
          <a v-for="(item, i) in post.toc" :key="item.id" :href="`#${item.id}`" @click.prevent="goTo(item.id)">{{ padN(i + 1) }} {{ item.title.toUpperCase() }}</a>
        </nav>

        <div ref="proseEl" class="prose" @click="onProseClick" v-html="post.html" />

        <div class="end">
          <span class="end__kicker">QUEST CONCLUÍDA</span>
          <span class="end__title">Curtiu? Deixa um coração e passa pra frente.</span>
          <div class="end__actions">
            <button type="button" class="press end__like" :aria-pressed="liked" @click="toggleLike">
              <svg :key="beat" :class="{ beat: beat > 0 }" width="18" height="18" viewBox="0 0 24 24"
                :fill="liked ? '#ff4f8b' : 'none'" stroke="#ff4f8b" stroke-width="2" aria-hidden="true">
                <path d="M12 21s-7.5-4.6-9.5-9.2C1 8.3 3.2 5 6.6 5c2 0 3.6 1.1 5.4 3 1.8-1.9 3.4-3 5.4-3 3.4 0 5.6 3.3 4.1 6.8C19.5 16.4 12 21 12 21Z" />
              </svg>
              {{ liked ? 'CURTIDO' : 'CURTIR' }} · {{ likes }}
            </button>
            <button type="button" class="press end__share" @click="share">{{ shareLabel }}</button>
          </div>
        </div>
      </article>
    </section>

    <section v-if="next.length" class="next">
      <div class="arc-wrap next__inner">
        <div class="next__head">
          <h2 class="next__title">Próximas quests</h2>
          <NuxtLink to="/post" class="next__all">VER TODAS →</NuxtLink>
        </div>
        <div class="next__grid">
          <PostCard v-for="p in next" :key="p.slug" :post="p" compact />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import getSiteMeta from '~/utils/getSiteMeta'
import { formatPostDate, padN, postTag } from '~/data/posts'

definePageMeta({ layout: 'arcade', reading: true })

const route = useRoute()
const config = useRuntimeConfig()
const store = likeStore()

const { data: post, error } = await useFetch(`/api/posts/view/${route.params.slug}`, { key: `post-${route.params.slug}` })

if (error.value || !post.value?.slug) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
}

const tag = computed(() => postTag(post.value.title))

// Próximas quests: os outros posts mais recentes.
const { data: all } = await useFetch('/api/posts/summaries', { default: () => [] })
const next = computed(() => (Array.isArray(all.value) ? all.value : []).filter((p) => p.slug !== post.value.slug).slice(0, 3))

// ---- curtidas ----
const likes = ref(post.value.likes)
const liked = ref(false)
const beat = ref(0)
let busy = false

const toggleLike = async () => {
  if (busy) return
  busy = true

  const id = post.value._id
  const was = liked.value

  // atualiza na hora e desfaz se a API falhar
  liked.value = !was
  likes.value += was ? -1 : 1
  beat.value += 1
  if (was) store.removeToList(id)
  else store.pushToList(id)

  try {
    const res = await $fetch(`/api/posts/like/${id}`, { method: 'POST', body: { action: was ? 'dislike' : 'like' } })
    if (typeof res?.posts !== 'number') throw new Error('like failed')
    likes.value = res.posts
  } catch (e) {
    liked.value = was
    likes.value += was ? 1 : -1
    if (was) store.pushToList(id)
    else store.removeToList(id)
  } finally {
    busy = false
  }
}

// ---- índice: rola até o título (a âncora padrão não rola com o router do Nuxt) ----
const goTo = (id) => {
  const target = document.getElementById(id)
  if (!target) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  window.history.replaceState(window.history.state, '', `#${id}`)
}

// ---- compartilhar ----
const shareState = ref('idle')
let shareTimer = null
const shareLabel = computed(() => ({ idle: 'COPIAR LINK', ok: 'LINK COPIADO!', fail: 'COPIE DA BARRA DE ENDEREÇO' })[shareState.value])

const share = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    shareState.value = 'ok'
  } catch (e) {
    shareState.value = 'fail'
  }
  clearTimeout(shareTimer)
  shareTimer = setTimeout(() => { shareState.value = 'idle' }, 2200)
}

// ---- blocos de código: moldura com botão "copiar" ----
const proseEl = ref(null)

const wrapCodeBlocks = () => {
  proseEl.value?.querySelectorAll('pre').forEach((pre) => {
    if (pre.parentElement.classList.contains('codebox')) return

    const box = document.createElement('div')
    box.className = 'codebox'
    const head = document.createElement('div')
    head.className = 'codebox__head'
    head.innerHTML = '<span>CÓDIGO</span><button type="button" data-copy>COPIAR</button>'
    pre.replaceWith(box)
    box.append(head, pre)
  })
}

const onProseClick = async (event) => {
  const button = event.target.closest?.('[data-copy]')
  if (!button) return

  try {
    await navigator.clipboard.writeText(button.closest('.codebox').querySelector('pre').innerText)
    button.textContent = 'COPIADO!'
  } catch (e) {
    button.textContent = 'FALHOU'
  }
  setTimeout(() => { button.textContent = 'COPIAR' }, 2000)
}

// ---- tempo real (Pusher) ----
let pusher = null
let gone = false

onMounted(async () => {
  wrapCodeBlocks()
  liked.value = store.getLikeById(post.value._id) !== null

  if (!config.public.pusherKey) return
  const { default: Pusher } = await import('pusher-js')
  if (gone) return

  pusher = new Pusher(config.public.pusherKey, { cluster: config.public.pusherCluster })
  pusher.subscribe('portfolio-likes-sp').bind('postAction', (data) => {
    if (data?.id === post.value._id) likes.value = data.likes
  })
})

onBeforeUnmount(() => {
  gone = true
  clearTimeout(shareTimer)
  pusher?.disconnect()
})

useHead({
  title: `Felipecss - ${post.value.title}`,
  meta: getSiteMeta({
    type: 'article',
    title: post.value.title,
    description: post.value.excerpt,
    url: `${config.public.baseUrl}/post/${post.value.slug}`
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

.rhero {
  padding-top: clamp(40px, 6vw, 80px);
  padding-bottom: 56px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 56px;
}

.rhero__text {
  flex: 999 1 560px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.rhero__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-family: var(--arc-mono);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.rhero__quest,
.rhero__tag {
  padding: 6px 10px;
  border-radius: 4px;
}

.rhero__quest {
  background: var(--arc-acc);
  color: var(--arc-bg);
}

.rhero__tag {
  border: 2px solid var(--arc-lil);
  color: var(--arc-lil);
}

.rhero__title {
  margin: 0;
  font-weight: 700;
  font-size: clamp(40px, 6vw, 92px);
  line-height: 0.95;
  letter-spacing: -0.045em;
  overflow-wrap: anywhere;
}

.rhero__by {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  font-family: var(--arc-mono);
  font-size: 13px;
  color: var(--arc-dim);
}

.rhero__author {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--arc-ink);
}

.rhero__avatar {
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  object-fit: cover;
  border: 2px solid var(--arc-acc);
}

.rhero__label {
  position: absolute;
  left: 24px;
  top: 20px;
  font-family: var(--arc-mono);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.like {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: var(--arc-ink);
  font-family: var(--arc-mono);
  font-weight: 800;
}

.like--pill {
  height: 36px;
  padding: 0 12px;
  background: transparent;
  border: 2px solid var(--arc-pink);
  border-radius: 4px;
  font-size: 13px;
}

.like--on {
  background: #2a1420;
}

.beat {
  animation: beat 0.45s cubic-bezier(0.3, 1.8, 0.5, 1);
}

@keyframes beat {
  0% {
    transform: scale(0.7);
  }
  60% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.rbody {
  padding-bottom: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rbody__article {
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  min-width: 0;
}

.toc {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px;
  border: 2px solid var(--arc-line);
  border-radius: 8px;
  font-family: var(--arc-mono);
  font-size: 12px;
  letter-spacing: 0.06em;
}

.toc__title {
  color: var(--arc-dim);
  width: 100%;
}

.toc a {
  text-decoration: none;
  padding: 6px 10px;
  background: var(--arc-panel);
  border-radius: 4px;
}

/* Conteúdo vindo do editor (HTML do Quill, sanitizado no servidor) */
.prose {
  font-size: 20px;
  line-height: 1.75;
  color: #e4dfec;
  overflow-wrap: anywhere;
  counter-reset: sec;
}

.prose :deep(> * + *) {
  margin-top: 28px;
}

.prose :deep(p) {
  margin-bottom: 0;
}

.prose :deep(p:has(> br:only-child)) {
  display: none;
}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3) {
  margin-top: 40px;
  font-size: 36px;
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--arc-ink);
}

.prose :deep(h3) {
  font-size: 28px;
}

.prose :deep([id^='sec-']) {
  counter-increment: sec;
}

.prose :deep([id^='sec-'])::before {
  content: counter(sec, decimal-leading-zero);
  color: var(--arc-acc);
  font-family: var(--arc-mono);
  font-size: 18px;
  vertical-align: middle;
  margin-right: 12px;
}

.prose :deep(a) {
  color: var(--arc-acc);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.prose :deep(strong) {
  color: var(--arc-ink);
}

.prose :deep(ul),
.prose :deep(ol) {
  padding-left: 1.4em;
}

.prose :deep(li + li) {
  margin-top: 8px;
}

.prose :deep(li[data-list='bullet']) {
  list-style-type: disc;
}

.prose :deep(blockquote) {
  margin-left: 0;
  padding: 4px 0 4px 20px;
  border-left: 4px solid var(--arc-acc);
  color: var(--arc-soft);
}

.prose :deep(img) {
  display: block;
  max-width: 100%;
  height: auto;
  background: var(--arc-panel);
  border: 2px solid var(--arc-line);
  border-radius: 8px;
}

.prose :deep(iframe),
.prose :deep(video) {
  max-width: 100%;
  border: 0;
  border-radius: 8px;
}

.prose :deep(.ql-align-center) {
  text-align: center;
}

.prose :deep(.ql-align-right) {
  text-align: right;
}

.prose :deep(.ql-align-justify) {
  text-align: justify;
}

.prose :deep(code) {
  padding: 2px 6px;
  background: var(--arc-panel);
  border-radius: 4px;
  font-family: var(--arc-mono);
  font-size: 0.85em;
}

.prose :deep(pre) {
  margin: 0;
  padding: 18px;
  background: var(--arc-panel);
  border: 2px solid var(--arc-line);
  border-radius: 8px;
  font-family: var(--arc-mono);
  font-size: 15px;
  line-height: 1.7;
  color: var(--arc-ink);
  overflow-x: auto;
  white-space: pre;
}

.prose :deep(.codebox) {
  border: 2px solid var(--arc-line);
  border-radius: 8px;
  overflow: hidden;
  background: var(--arc-panel);
}

.prose :deep(.codebox pre) {
  border: 0;
  border-radius: 0;
}

.prose :deep(.codebox__head) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-bottom: 2px solid var(--arc-line);
  font-family: var(--arc-mono);
  font-size: 12px;
  color: var(--arc-dim);
}

.prose :deep(.codebox__head button) {
  height: 30px;
  padding: 0 10px;
  background: transparent;
  border: 2px solid var(--arc-line-soft);
  border-radius: 4px;
  color: var(--arc-ink);
  font-family: inherit;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
}

.end {
  margin-top: 24px;
  padding: clamp(24px, 4vw, 40px);
  border-radius: 10px;
  background: var(--arc-acc);
  color: var(--arc-bg);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.end__kicker {
  font-family: var(--arc-mono);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.end__title {
  font-size: clamp(30px, 3.4vw, 44px);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
}

.end__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.end__like,
.end__share {
  height: 48px;
  padding: 0 18px;
  border-radius: 4px;
  font-family: var(--arc-mono);
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
}

.end__like {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--arc-bg);
  color: var(--arc-ink);
  border: 0;
}

.end__share {
  background: transparent;
  color: var(--arc-bg);
  border: 2px solid var(--arc-bg);
}

.next {
  background: var(--arc-panel);
}

.next__inner {
  padding-top: 80px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.next__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
}

.next__title {
  margin: 0;
  font-size: clamp(36px, 4vw, 56px);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1;
}

.next__all {
  font-family: var(--arc-mono);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--arc-acc) !important;
}

.next__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

@media (prefers-reduced-motion: reduce) {
  .beat {
    animation: none;
  }
}
</style>
