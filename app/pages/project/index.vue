<template>
  <section class="arc-wrap plist">
    <div class="plist__head">
      <span class="arc-eyebrow">03 · MISSÕES</span>
      <h1 class="arc-h2">Todas as missões</h1>
      <p class="plist__lead">Projetos que tirei do papel: do primeiro commit ao deploy.</p>
    </div>

    <div v-if="projects.length" class="plist__grid">
      <ProjectCard v-for="(project, i) in projects" :key="project.slug" :project="project"
        :kicker="`MISSÃO ${String(projects.length - i).padStart(2, '0')}`" />
    </div>
    <p v-else class="plist__empty">Nenhuma missão encontrada por aqui ainda.</p>
  </section>
</template>

<script setup>
import getSiteMeta from '~/utils/getSiteMeta'

definePageMeta({ layout: 'arcade' })

const config = useRuntimeConfig()

const { data } = await useFetch('/api/projects/paginate', { query: { limit: 100 } })

const projects = computed(() => {
  const docs = Array.isArray(data.value?.docs) ? data.value.docs : []

  return docs
    .filter((p) => p?.slug && p?.name)
    .map((p) => ({ slug: p.slug, name: p.name, image: p.images?.[0]?.url, imageAlt: p.images?.[0]?.description }))
})

const meta = getSiteMeta({
  type: 'website',
  title: 'Listando meus projetos',
  description: 'Explorando o mundo da programação e dos jogos, com pitadas de diversão e conhecimento. Veja os projetos que já tirei do papel.',
  url: `${config.public.baseUrl}/project`
})

useHead({
  title: 'Felipecss - Meus projetos',
  meta
})
</script>

<style scoped>
.plist {
  padding-top: clamp(48px, 7vw, 96px);
  padding-bottom: 112px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.plist__head {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.plist__lead {
  margin: 0;
  font-size: 20px;
  line-height: 1.55;
  color: var(--arc-soft);
  max-width: 48ch;
}

.plist__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.plist__empty {
  margin: 0;
  font-family: var(--arc-mono);
  color: var(--arc-dim);
}
</style>
