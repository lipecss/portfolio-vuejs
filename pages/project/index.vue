<template>
  <loading :active.sync="loadingProjects" color="#42b883" :can-cancel="false" :lock-scroll="true" :is-full-page="true"
    background-color="#000" />

  <div class="flex flex-col h-screen">
    <div class="header text-center font-medium leading-normal">Lista de Projetos</div>

    <div class="flex-grow">
      <div class="px-10 py-20 min-h-screen">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Thumb v-for="(project, index) in projects" :key="index" :data="project" />
        </div>

        <DownArrow v-if="!showNoMoreText" class="mt-20"/>

        <p v-else class="w-full text-center pt-20 pb-10">Sem mais conteúdo para mostrar</p>
      </div>
    </div>
    <AlternativeFooter />
  </div>
</template>

<script setup>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const config = useRuntimeConfig()

let projects = ref([])
let projectLimit = ref(null)
let currentPage = ref(1)
let maxPage = ref(0)
let loadingProjects = ref(true)

const { data: projectData, error } = useLazyFetch('/api/projects/paginate')

watch(projectData, (item) => {
  projectLimit.value = item.docs.length

  maxPage.value = item.totalPages

  for (var i = 0; i < projectLimit.value; i++) {
    projects.value.push(item.docs[i])
  }

  loadingProjects.value = false
}, { deep: true })

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

const showNoMoreText = computed(() => {
  return !loadingProjects.value && currentPage.value >= maxPage.value
})

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const onScroll = () => {
  const bottomOfWindow = Math.round(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 50;

  if (bottomOfWindow && !loadingProjects.value) {
    if (currentPage.value < maxPage.value) {
      loadingProjects.value = true // define a variável como true antes de iniciar a solicitação
      setTimeout(async () => {
        currentPage.value += 1
        // eslint-disable-next-line prefer-const
        let page = currentPage.value

        const { data: projectData, error } = await useFetch(`/api/projects/paginate/?page=${page}`)

        if (!error.value) {
          if (page <= projectData.value.totalPages) {
            projects.value = projects.value.concat(projectData.value.docs)
            projectLimit.value += projectData.value.docs.length
          } else {
            currentPage.value = maxPage.value
          }
        }

        loadingProjects.value = false

      }, 300)
    }
  }
}

const meta = computed(() => {
  const metaData = {
    type: 'project',
    title: 'Listando meus projetos',
    description: 'Explorando o mundo da programação e dos jogos, com pitadas de diversão e conhecimento. Venha conferir minhas postagens sobre os temas que mais gosto e fique por dentro das novidades do universo tecnológico.',
    url: `${config.baseUrl}/project}`
  }

  return getSiteMeta(metaData)
})

useHead({
  title: `Felipecss - Meus projetos`,
  meta: () => [...meta.value]
})
</script>

<style lang="scss" scoped>
.header {
  font-size: 14.888889vw;
  background: linear-gradient(180deg, #41b883 21.09%, #00DC82 64.08%, #35495e 91.34%);
  -webkit-background-clip: text;
  color: transparent;
}
</style>
