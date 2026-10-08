<template>
  <div class="flex gap-10">
    <div class="w-2/4 relative">
      <input type="text" v-model="input"
        class="bg-gray-50 border border-gray-300 bg-transparent placeholder:text-g1 text-sm rounded-md w-full p-2.5"
        placeholder="Search Skills" @focus="showList = true" @blur="showList = false">
      <div v-if="showList" class="fruit overflow-y-scroll max-h-52 border">
        <div class="flex items-center py-3 border" v-for="skill in filteredList()" :key="skill">
          <div class="w-3/5">
            <SvgRender :icon="skill.image" />
          </div>
          <div class="text-white">
            <span class="text-2xl">{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="w-2/3">
      <input type="text" v-model="name"
        class="bg-gray-50 border border-gray-300 bg-transparent placeholder:text-g1 text-sm rounded-md w-full p-2.5 mb-6"
        placeholder="Svg name">

      <textarea v-model="svg" id="" cols="30" rows="10" placeholder="Svg code"
        class="bg-gray-50 border border-gray-300 bg-transparent placeholder:text-g1 text-sm rounded-md w-full p-2.5 mb-6" />

      <button class="disabled:opacity-75 h-20 w-40 p-6 disabled:cursor-not-allowed button border-2 border-g1 text-g1"
        :disabled="!canSendContent" @click="createSkill">
        Send
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

let token = null

if (process.client) {
  token = JSON.parse(localStorage.getItem(Object.keys(localStorage).find(key => key.includes('sb-') && key.includes('auth-token')))).access_token
}

let input = ref('')
let showList = ref(false)
let skills = ref([])
let name = ref('')
let svg = ref('')

const canSendContent = computed(() => {
  return name.value && svg.value
})

const filteredList = () => {
  return skills.value.filter((skill) =>
    skill.name.toLowerCase().includes(input.value.toLowerCase())
  )
}

const clearForm = () => {
  name.value = ''
  svg.value = ''
}

const createSkill = async () => {
  const { data, error } = await useFetch('/api/skills', {
    method: 'POST',
    headers: {
      'x-access-token': token
    },
    body: {
      name: name.value,
      image: svg.value,
    }
  })

  if (!error.value) {
    useNuxtApp().$toast.success('Skill created!', {
      theme: 'dark'
    })

    skills.value.push(data.value)

    clearForm()
  } else {
    useNuxtApp().$toast.error('Falha ao criar a Skill. Tente novamente!', {
      theme: 'dark'
    })
  }
}

onBeforeMount(() => {
  nextTick(async () => {
    const { data: skillData, error } = await useLazyAsyncData('skillData', () => $fetch('/api/skills'))

    if (!error.value) {
      skills.value = skillData.value
    }
  })
})

</script>
