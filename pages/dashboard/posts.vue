<template>
  <loading
    :active.sync="pending || loadingPosts" 
    color="#42b883" 
    :can-cancel="false" 
    :lock-scroll="true"
    :is-full-page="true"
    background-color="#000" 
  />

  <div class="inner-container my-0">
    <h2 class="text-3xl">Meus posts</h2>

    <div class="flex w-full items-center mb-7">
      <div class="ml-auto text-g1 text-xs sm:inline-flex hidden items-center">
        <span class="mr-3">Página {{ currentPage }} de {{ maxPage }}</span>
        <button
          class="disabled:border-gray-600 inline-flex mr-2 items-center h-8 w-8 justify-center text-g1 rounded-md shadow border border-gray-200 dark:border-g1 hover:enabled:border-white hover:enabled:text-white py-0"
          :disabled="currentPage === 1" @click="paginatePOST(currentPage - 1)">
          <svg class="w-4" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
            stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button
          class="disabled:border-gray-600 inline-flex mr-2 items-center h-8 w-8 justify-center text-g1 rounded-md shadow border border-gray-200 dark:border-g1 hover:enabled:border-white hover:enabled:text-white py-0"
          :disabled="currentPage >= maxPage" @click="paginatePOST(currentPage + 1)">
          <svg class="w-4" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
            stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
    <table class="w-full text-left">
      <thead>
        <tr class="text-g1">
          <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Titulo</th>
          <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 hidden md:table-cell">
            Slug
          </th>
          <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800  text-g1">
            Likes
          </th>
          <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Criado</th>
          <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800  text-g1">
            Editado
          </th>
          <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800  text-g1">
            Ação
          </th>
        </tr>
      </thead>

      <tbody class="text-gray-600 dark:text-gray-100">
        <tr v-for="(post, index) in posts" :key="index">
          <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
            <nuxt-link 
              class="hover:text-g1"
              :to="`/post/${post.slug}`"
              target="_blank"
              :title="post.title"
            >
              {{ post.title }}
            </nuxt-link>
          </td>

          <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden"> {{ post.slug }}
          </td>
          <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden"> {{ post.likes }}</td>
          <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">{{ parseDate(post.created_at) }}</td>
          <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
            <div class="flex items-center">
              <div class="sm:flex hidden flex-col">
                24.12.2020
                <div class="text-gray-400 text-xs">11:16 AM</div>
              </div>
            </div>
          </td>
          <td class="border-b border-gray-200 dark:border-gray-800">
            <button class="w-full flex justify-evenly content-center s text-gray-400">
              <span class="hover:text-blue-500" id="edit"><font-awesome-icon :icon="['fas', 'pencil-alt']" /></span>
              <span class="hover:text-red-500" id="delete"><font-awesome-icon :icon="['fas', 'trash-alt']" /></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import spacetime from 'spacetime'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

let img = ref('')
let title = ref('')
let content = ref('')
let isHover = ref(false)
let postLimit = ref(null)
let currentPage = ref(1)
let maxPage = ref(0)
let posts = ref([])
let loadingPosts = ref(false)

let token = null

const { data: postData, error, pending } = await useLazyFetch('/api/posts/paginate')

if (!error.value) {
  postLimit.value = postData.value.docs.length

  maxPage.value = postData.value.totalPages

  for (var i = 0; i < postLimit.value; i++) {
    posts.value.push(postData.value.docs[i])
  }
}

if (process.client) {
  token = JSON.parse(localStorage.getItem(Object.keys(localStorage).find(key => key.includes('sb-') && key.includes('auth-token')))).access_token
}

const parseDate = (datetime) => {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  const month = months[spacetime(datetime).month()]
  let day = spacetime(datetime).date()
  let year = spacetime(datetime).year()

  return `${day} de ${month}, ${year}`
}

const paginatePOST = async (page) => {
  loadingPosts.value = true

  const { data: postData, error } = await useLazyFetch(`/api/posts/paginate/?page=${page}`)

  if (!error.value) {

    const newPosts = postData.value.docs.filter(post => !posts.value.some(p => p._id === post._id))
    posts.value = newPosts
    postLimit.value = posts.value.length
    currentPage.value = page
  }

  loadingPosts.value = false
}

const createPost = async () => {
  const titles = `title-${Math.floor(Math.random() * 1000)}`

  console.log('titles', titles)

  const { data, error } = await useFetch('/api/posts', {
    method: 'POST',
    headers: {
      'x-access-token': token
    },
    body: {
      img: img.value,
      title: titles,
      content: content.value
    }
  })

  console.log('data', data.value)
}
</script>
