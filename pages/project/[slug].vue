<template>
  <div class="project-page px-6">
    <div class="my-10">
      <h2 class="text-6xl" v-if="projectData.url">
        <NuxtLink 
          :to="projectData.url"
          target="_blank"
          rel="noopener noreferrer"
          class="project-page__name"
          :alt="`Acessar ${projectData.name}`"
          :title="`Acessar ${projectData.name}`"
        >
          {{ projectData.name }}
        </NuxtLink>
      </h2>

      <h2 v-else class="project__content-area-title">{{ projectData.name }}</h2>
    </div>

    <ProjectImages :images="projectData.images" />

    <div class="my-20 text-xl">
      {{ projectData.description }}
    </div>

    <div class="mt-10">
      <h2 class="project-page__skills" style="line-height: 100%; margin: 0;">
        <span class="block text-7xl md:text-9xl" style="backface-visibility: hidden;">Linguagens</span>
        <span class="block text-7xl md:text-9xl" style="backface-visibility: hidden;">Linguagens</span>
        <span class="block text-7xl md:text-9xl text-g1 gradient" style="backface-visibility: hidden;">
          Linguagens e Ferramentas
        </span>
        <span class="block text-7xl md:text-9xl" style="backface-visibility: hidden;">Linguagens</span>
      </h2>

      <div class="skills my-10">
        <div class="grid grid-cols-2 lg:grid-cols-4 justify-items-center">
          <div v-for="skill in projectData.skills" :key="skill._id" class="w-24 max-w-xs h-full lg:w-48">
            <div v-html="skill.image" ></div>
            <p>{{ skill.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { params } = useRoute()
const router = useRouter()

const { data: projectData, error } = await useFetch(`/api/projects/${params.slug}`)

if (error.value) {
 throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

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

  &__skills {
    span {
      line-height: 100%;
      letter-spacing: -.02em;
      margin: 0;
    }
  }
}
.skills svg {
  width: 100%;
  height: 100%;
  max-width: 600px;
}
</style>
