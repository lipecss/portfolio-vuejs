<template>
  <div class="px-6">
    <div class="my-10">
      <h2 class="text-6xl" v-if="projectData.url">
        <a :href="projectData.url" target="_blank" rel="noopener noreferrer">{{ projectData.name }}</a>
      </h2>

      <h2 v-else class="project__content-area-title">{{ projectData.name }}</h2>
    </div>


    <ProjectImages :images="projectData.images" />

    <div class="mt-10 text-xl">
      {{ projectData.description }}
    </div>

    <div class="mt-10">
      <h2 class="contacts" style="line-height: 100%; margin: 0;">
        <span class="block text-6xl md:text-9xl" style="backface-visibility: hidden;">Linguagens</span>
        <span class="block text-6xl md:text-9xl" style="backface-visibility: hidden;">Linguagens</span>
        <span class="block text-6xl md:text-9xl text-g1 gradient" style="backface-visibility: hidden;">
          Linguagens e Ferramentas
        </span>
        <span class="block text-6xl md:text-9xl" style="backface-visibility: hidden;">Linguagens</span>
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
.skills svg {
  width: 100%;
  height: 100%;
  max-width: 600px;
}
</style>
