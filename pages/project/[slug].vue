<template>
  <div class="project-page px-6">
    <div class="mt-10 mb-14">
      <h2 class="text-6xl" v-if="projectData.url">
        <NuxtLink :to="projectData.url" target="_blank" rel="noopener noreferrer" class="project-page__name"
          :alt="`Acessar ${projectData.name}`" :title="`Acessar ${projectData.name}`">
          {{ projectData.name }}
        </NuxtLink>
      </h2>

      <h2 v-else class="text-6xl project-page__name">{{ projectData.name }}</h2>

      <div class="text-center pt-6">
        <Breadcrumb 
          id="basebreadcrumb-articles"
          :breadcrumbList="breadcrumbList"
        />
      </div>
    </div>

    <ProjectImages :images="projectData.images" />

    <div class="project-page__description my-20">
      {{ projectData.description }}
    </div>

    <div class="mt-10">
      <h2 class="project-page__skills" style="line-height: 100%; margin: 0;">
        <span class="block text-6xl md:text-9xl" style="backface-visibility: hidden;">Linguagens</span>
        <span class="block text-6xl md:text-9xl" style="backface-visibility: hidden;">Ferramentas</span>
        <span class="block text-6xl md:text-9xl text-g1 gradient" style="backface-visibility: hidden;">
          Linguagens e Ferramentas
        </span>
        <span class="block text-6xl md:text-9xl" style="backface-visibility: hidden;">Linguagens</span>
      </h2>

      <div class="skills my-10">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-y-20 justify-items-center mb-20">
          <div v-for="skill in projectData.skills" :key="skill._id" class="w-1/2 lg:w-1/4 max-w-xs h-full">
            <div class="w-full h-full">
              <div v-html="skill.image" class="max-w-xs"></div>
            </div>
            <p class="mt-2">{{ skill.name }}</p>
          </div>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>

<script setup>
const { params } = useRoute()
const config = useRuntimeConfig()
import getSiteMeta from '@/utils/getSiteMeta'

const { data: projectData, error } = await useFetch(`/api/projects/${params.slug}`)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

const breadcrumbList = computed(() => {
  const { name } = projectData.value
  return [
    {
      name: 'Inicio',
      link: {
        type: 'route-path',
        path: '/'
      }
    },
    {
      name: 'Lista de Projetos',
      link: {
        type: 'route-path',
        path: '/project'
      }
    }
  ]
})

const meta = computed(() => {
  const metaData = {
    type: 'article',
    title: projectData.value.name,
    description: projectData.value.description,
    mainImage: projectData.value.images[0],
    url: `${config.baseUrl}/project/${projectData.value.slug}`
  }

  return getSiteMeta(metaData)
})

useHead({
  title: `Felipecss - ${projectData.value.name}`,
  meta: () => [...meta.value]
})

</script>

<style lang="scss">
.project-page {
  &__name {
    background-image: linear-gradient(180deg, #00DC82 21.09%, #009d5d 65.0%, #18181B 91.34%);
    -webkit-text-fill-color: transparent;
    color: transparent;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;

    &:hover {
      background-image: linear-gradient(180deg, #fff 21.09%, #fff 64.08%, #fff 91.34%);
      color: transparent;
      transition: background-color 0.5s ease-out;
    }
  }

  &__description {
    font-size: 24px;
    line-height: 125%;
  }
}

.skills svg {
  width: 100%;
  height: 100px;
  max-width: 100px;
}
</style>
