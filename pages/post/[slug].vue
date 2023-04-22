<template>
  <div>
    <div class="hero block mb-32">
      <div class="diagonal-hero-bg" :style="heroBg">
        <div class="opacity z-50 absolute inset-0 bg-gray-900 opacity-75" />
        <div class="px-8 h-full z-50 w-full relative grid items-center content-center  justify-center">
          <p class="text-5xl">{{ postData.title }}</p> <br>

          <div class="flex flex-row justify-center items-center text-2xl">
            <span class="mr-3">{{ parseDate(postData.created_at) }}</span>
            <hr class="vertical mr-3">
            <span class="mr-3">Felipecss</span>
            <hr class="vertical mr-3">
            <div class="flex items-center">
              <button class="like mr-3 inline-flex items-center" :title="likeTittleButton" @click="toggleLikeButton">
                <NuxtImg v-if="!liked"
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Black%20Heart.png"
                  alt="Black Heart" width="40" height="40" format="webp" quality="80"
                  sizes="sm:100vw md:100vw lg:100vw" />

                <NuxtImg v-else
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Red%20Heart.png"
                  alt="Red Heart" width="40" height="40" format="webp" quality="80" sizes="sm:100vw md:100vw lg:100vw" />
              </button>
              <span class="text-md" id="like-count" :title="`${likes} curtidas`">{{ likes }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="text-center mt-3 mb-6">
      <Breadcrumb id="basebreadcrumb-articles" :breadcrumbList="breadcrumbList" />
    </div>

    <div class="content px-6">
      <div v-html="sanitezed" class="ql-editor innerhtml"></div>
    </div>
  </div>
</template>

<script setup>
import createDOMPurify from 'dompurify'
import spacetime from 'spacetime'
import getSiteMeta from '@/utils/getSiteMeta'

const { params } = useRoute()
const { pushToList, getLikeById, removeToList } = likeStore()
const config = useRuntimeConfig()

// datas
let likes = ref(0)
let liked = ref(false)
const heroBg = ref(null)
let sanitezed = ref('')

// computeds
const likeTittleButton = computed(() => {
  return liked.value ? 'Remover curtida' : 'Curtir postagem'
})

const breadcrumbList = computed(() => {
  const { title } = postData.value

  return [
    {
      name: 'Inicio',
      link: {
        type: 'route-path',
        path: '/'
      }
    },
    {
      name: 'Lista de Postagens',
      link: {
        type: 'route-path',
        path: '/post'
      }
    },
    {
      name: title,
      link: {}
    }
  ]
})

const { data: postData, error } = await useFetch(`/api/posts/${params.slug}`)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

// methods
const toggleLikeButton = async () => {
  const { _id } = postData.value

  const result = getLikeById(_id)

  if (result === null) {
    pushToList(_id)

    const { data: likesData, error } = await useFetch(`/api/posts/like/${_id}`, {
      method: 'POST',
      body: {
        action: 'like'
      }
    })

    if (!error.value) {
      liked.value = true
      likes.value = likesData.value.posts
    }

  } else {
    removeToList(_id)

    const { data: likesData, error } = await useFetch(`/api/posts/like/${_id}`, {
      method: 'POST',
      body: {
        action: 'dislike'
      }
    })

    if (!error.value) {
      liked.value = false
      likes.value = likesData.value.posts
    }
  }
}

const isAlreadyLike = async (id) => {
  const result = getLikeById(id)
  if (result == null) liked.value = false
  else liked.value = true
}

const parseDate = (datetime) => {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  const month = months[spacetime(datetime).month()]
  let day = spacetime(datetime).date()
  let year = spacetime(datetime).year()

  return `${day} de ${month}, ${year}`
}

const sanitizeContent = () => {
  const purify = createDOMPurify(window)
  sanitezed.value = purify.sanitize(postData.value.content)

  const div = document.createElement('div')

  div.innerHTML = sanitezed.value;
  const links = div.querySelectorAll('a')

  for (let i = 0; i < links.length; i++) {
    links[i].setAttribute('target', '_blank')
  }
}

// subscribePusher()

// lifeCycle
onMounted(async () => {
  isAlreadyLike(postData.value._id)

  likes.value = postData.value.likes

  heroBg.value = {
    background: `url(${postData.value.img})`,
    'background-size': 'cover',
    'background-repeat': 'no-repeat, no-repeat',
    'background-position': 'center',
    width: '100%'
  }

  if (process.client) {
    sanitizeContent()
  }
})

const meta = computed(() => {
  const metaData = {
    type: 'post',
    title: postData.value.title,
    description: postData.value.description,
    mainImage: postData.value.img,
    url: `${config.baseUrl}/post/${postData.value.slug}`
  }

  return getSiteMeta(metaData)
})

useHead({
  title: `Felipecss - ${postData.value.title}`,
  meta: () => [...meta.value]
})
</script>

<style lang="scss" scoped>
.hero {
  display: inline-block;
  width: 100%;
  height: 500px;
  position: relative;
  z-index: 70;
}

.diagonal-hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 600px;
  z-index: -1;
}

.diagonal-hero-bg,
.opacity {
  width: 100%;
  height: 600px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%);
}

.vertical {
  width: 0px;
  height: 26px;
  border: 1px solid #41b883;
}
</style>
