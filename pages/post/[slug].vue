<template>
  <div>
    <div class="hero block">
      <div class="diagonal-hero-bg" :style="heroBg">
        <div class="opacity z-50 absolute inset-0 bg-gray-900 opacity-75" />
      </div>
    </div>

    <div class="like" @click="toggleLikeButton">
      <font-awesome-icon :icon="['fas', 'heart']" color="#dc3545" />
        <span id="like-count">{{ likes }}</span>
    </div>
  </div>
  liked {{ liked }}
</template>

<script setup>
import Pusher from 'pusher-js'


const { params } = useRoute()
const { pushToList, getLikeById, removeToList } = likeStore()

// datas
let likes = ref(0)
let liked = ref(false)
const heroBg = ref(null)

const { data: postData, error } = await useFetch(`/api/posts/${params.slug}`)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

// methods
const subscribePusher = () => {
  const pusher = new Pusher('640cf85899a511c2c024', {
    cluster: 'us2',
  })

  const channel = pusher.subscribe('portfolio-likes')
  channel.bind('postAction', (data) => {
    console.log('sdsdsd', data)
    likes.value = data.likes
  })
}

const toggleLikeButton = async () => {
  const { _id } = postData.value

  const result = await getLikeById(_id)

  if (result === null) {
    pushToList(_id)

    const { error } = await useFetch(`/api/posts/like/${_id}`, {
      method: 'POST',
      body: {
        action: 'like'
      }
    })

    if (!error.value) {
      liked.value = true
    }

  } else {
    removeToList(_id)
    
    const { error } = await useFetch(`/api/posts/like/${_id}`, {
      method: 'POST',
      body: {
        action: 'dislike'
      }
    })

    if(!error.value) {
      liked.value = false
    }
  }
}

const isAlreadyLike = async (id) => {
  const result = getLikeById(id)
  if (result == null) liked.value = false
  else liked.value = true
}

subscribePusher()

// lifeCycle

onMounted(() => {
  isAlreadyLike(postData.value._id)

  likes.value = postData.value.likes

  heroBg.value = {
    background: `url(${postData.value.img})`,
    'background-size': 'cover',
    'background-repeat': 'no-repeat, no-repeat',
    'background-position': 'center',
    width: '100%'
  }
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

.diagonal-hero-bg, .opacity {
  width: 100%;
  height: 600px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%);
}
</style>
