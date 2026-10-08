<template>
  <NuxtLink :to="`/project/${project.slug}`" class="lift pcard">
    <div class="pcard__thumb">
      <img v-if="project.image && !broken" ref="imgEl" :src="project.image" :alt="project.imageAlt || project.name" loading="lazy"
        @error="broken = true">
      <span v-else>SEM IMAGEM</span>
    </div>
    <span v-if="kicker" class="pcard__kicker">{{ kicker }}</span>
    <span class="pcard__name">{{ project.name }}</span>
  </NuxtLink>
</template>

<script setup>
// link de imagem quebrado no banco: cai em "SEM IMAGEM"
const broken = ref(false)
const imgEl = ref(null)

// o erro pode ter disparado antes da hidratação, quando o @error ainda não existia
onMounted(() => {
  const img = imgEl.value
  if (img?.complete && img.naturalWidth === 0) broken.value = true
})

defineProps({
  // { slug, name, image?, imageAlt? }
  project: { type: Object, required: true },
  kicker: { type: String, default: '' }
})
</script>

<style scoped>
.pcard {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border: 2px solid var(--arc-line);
  border-radius: 10px;
  background: var(--arc-bg);
}

.pcard__thumb {
  aspect-ratio: 16 / 10;
  background: var(--arc-panel);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--arc-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: #8a8499;
}

.pcard__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pcard__kicker {
  font-family: var(--arc-mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--arc-lil);
}

.pcard__name {
  font-size: 24px;
  font-weight: 600;
}
</style>
