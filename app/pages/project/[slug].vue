<template>
  <article class="arc-wrap pj">
    <NuxtLink to="/project" class="pj__back">← TODAS AS MISSÕES</NuxtLink>

    <header class="pj__head">
      <span class="pj__badge">MISSÃO CONCLUÍDA</span>
      <h1 class="pj__title">{{ project.name }}</h1>
      <p v-if="project.description" class="pj__desc">{{ project.description }}</p>
      <div v-if="project.url" class="pj__cta">
        <a :href="project.url" class="press arc-btn arc-btn--solid" target="_blank" rel="noopener noreferrer"
          :title="`Acessar ${project.name}`">ABRIR PROJETO ↗</a>
      </div>
    </header>

    <section v-if="images.length" ref="galleryEl" class="pj__gallery" aria-label="Capturas do projeto">
      <figure v-for="(img, i) in images" :key="img.url" class="pj__shot">
        <img :src="img.url" :alt="img.description || project.name" :loading="i === 0 ? 'eager' : 'lazy'"
          @error="$event.target.closest('figure').hidden = true">
        <figcaption v-if="img.description">{{ img.description }}</figcaption>
      </figure>
    </section>

    <section v-if="skills.length" class="pj__loot">
      <span class="arc-eyebrow">LOOT · FERRAMENTAS USADAS</span>
      <ul class="pj__tags">
        <li v-for="skill in skills" :key="skill">{{ skill }}</li>
      </ul>
    </section>
  </article>
</template>

<script setup>
import getSiteMeta from '~/utils/getSiteMeta'
import { skillLabel } from '~/data/home'

definePageMeta({ layout: 'arcade' })

const { params } = useRoute()
const config = useRuntimeConfig()

const { data: project, error } = await useAsyncData(`project-${params.slug}`, () => $fetch(`/api/projects/${params.slug}`))

if (error.value || !project.value?.slug) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
}

const images = computed(() =>
  (project.value.images || []).map((img) => (typeof img === 'string' ? { url: img } : img)).filter((img) => img?.url)
)
const skills = computed(() => (project.value.skills || []).map((s) => skillLabel(s.name)))

const meta = getSiteMeta({
  type: 'article',
  title: project.value.name,
  description: project.value.description,
  mainImage: images.value[0]?.url,
  url: `${config.public.baseUrl}/project/${project.value.slug}`
})

useHead({
  title: `Felipecss - ${project.value.name}`,
  meta
})

// esconde capturas cujo link quebrou (inclusive as que falharam antes da hidratação)
const galleryEl = ref(null)
onMounted(() => {
  galleryEl.value?.querySelectorAll('img').forEach((img) => {
    if (img.complete && img.naturalWidth === 0) img.closest('figure').hidden = true
  })
})
</script>

<style scoped>
.pj {
  padding-top: clamp(32px, 5vw, 64px);
  padding-bottom: 112px;
  display: flex;
  flex-direction: column;
  gap: 56px;
}

.pj__back {
  align-self: flex-start;
  text-decoration: none;
  font-family: var(--arc-mono);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--arc-lil);
}

.pj__head {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.pj__badge {
  align-self: flex-start;
  font-family: var(--arc-mono);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  padding: 6px 10px;
  background: var(--arc-yel);
  color: var(--arc-bg);
  border-radius: 4px;
}

.pj__title {
  margin: 0;
  font-weight: 700;
  font-size: clamp(48px, 8vw, 128px);
  line-height: 0.9;
  letter-spacing: -0.045em;
  text-shadow: 5px 5px 0 var(--arc-acc);
  overflow-wrap: anywhere;
}

.pj__desc {
  margin: 0;
  font-size: clamp(18px, 1.8vw, 22px);
  line-height: 1.6;
  color: var(--arc-soft);
  max-width: 62ch;
  white-space: pre-line;
}

.pj__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.pj__gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.pj__shot {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.pj__shot:first-child {
  grid-column: 1 / -1;
}

.pj__shot img {
  display: block;
  width: 100%;
  height: auto;
  background: var(--arc-panel);
  border: 3px solid var(--arc-line);
  border-radius: 10px;
  box-shadow: 8px 8px 0 var(--arc-panel-hi);
}

.pj__shot figcaption {
  font-family: var(--arc-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--arc-dim);
}

.pj__loot {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 40px;
  border-top: 2px solid var(--arc-line);
}

.pj__tags {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-family: var(--arc-mono);
  font-size: 14px;
  font-weight: 700;
}

.pj__tags li {
  padding: 8px 14px;
  border: 2px solid var(--arc-line-soft);
  border-radius: 4px;
  background: var(--arc-panel);
}
</style>
