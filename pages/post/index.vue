<template>
  <loading :active.sync="loadingPosts" color="#42b883" :can-cancel="false" :lock-scroll="true" :is-full-page="true"
    background-color="#000" />

  <div class="flex flex-col h-screen">
    <div class="header text-center font-medium leading-normal">Lista de Postagens</div>

    <div class="flex-grow">
      <div class="px-10 py-20 min-h-screen">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ThumbPost v-for="(post, index) in posts" :key="index" :data="post" />
        </div>

        <DownArrow v-if="!showNoMoreText && !!posts.length" class="mt-20" />

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

let posts = ref([])
let postLimit = ref(null)
let currentPage = ref(1)
let maxPage = ref(0)
let loadingPosts = ref(false)

const { data: postData, error } = await useFetch('/api/posts/paginate')

if (!error.value) {
  postLimit.value = postData.value.docs.length

  maxPage.value = postData.value.totalPages

  for (var i = 0; i < postLimit.value; i++) {
    posts.value.push(postData.value.docs[i])
  }
}

const showNoMoreText = computed(() => {
  return !loadingPosts.value && currentPage.value >= maxPage.value
})

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const onScroll = () => {
  const bottomOfWindow = Math.round(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 50;

  if (bottomOfWindow && !loadingPosts.value) {
    if (currentPage.value < maxPage.value) {
      loadingPosts.value = true // define a variável como true antes de iniciar a solicitação
      setTimeout(async () => {
        currentPage.value += 1
        // eslint-disable-next-line prefer-const
        let page = currentPage.value

        const { data: postData, error } = await useFetch(`/api/posts/paginate/?page=${page}`)

        if (!error.value) {
          if (page <= postData.value.totalPages) {
            posts.value = posts.value.concat(postData.value.docs)
            postLimit.value += postData.value.docs.length
          } else {
            currentPage.value = maxPage.value
          }
        }

        loadingPosts.value = false

      }, 300)
    }
  }
}

const meta = computed(() => {
  const metaData = {
    type: 'project',
    title: 'Listando minhas postagens',
    description: 'Seja bem-vindo ao meu blog! Aqui, compartilho minhas paixões por programação e jogos, trazendo sempre conteúdos interessantes e divertidos para você. Explore meu site e fique por dentro das últimas novidades do mundo tecnológico.',
    url: `${config.baseUrl}/project}`
  }

  return getSiteMeta(metaData)
})

useHead({
  title: `Felipecss - Minhas postagens`,
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
