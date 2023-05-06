<template>
  <div class="fixed-modal left-0 p-0 bg-g4" v-if="isActive" id="fixed-modal"
    :style="{ height: `${dividerPosition}%` }">
    <div v-if="type === 'post'">
      <button class="relative block text-center hover:cursor-n-resize" id="btn-resize" @mousedown="startDrag">
        <span><font-awesome-icon :icon="['fas', 'arrows-alt-v']" /></span>
      </button>

      <div class="w-full">
        <div class="block lg:flex gap-x-4">
          <div class="w-2/3">
            <input v-model="title" type="text" placeholder="Title">
            <input id="img" v-model="postImage" type="text" placeholder="Img URL">
          </div>

          <div class="flex w-1/5 my-6 lg:m-0">
            <button class="button border-2 border-red-500 text-red-500" @click="emitCloseModal">
              Cancel
            </button>

            <button class="button border-2 border-blue-500 text-blue-500 ml-3" @click="showPreview = !showPreview">
              Preview
            </button>

            <button class="disabled:opacity-75 disabled:cursor-not-allowed button border-2 border-g1 text-g1 ml-3"
              :disabled="!canSendContent" @click="emitContentData">
              Send
            </button>
          </div>
        </div>

        <div :class="contentDisplay">
          <div :class="editorWidth">
            <ClientOnly>
              <vue-editor v-if="showEditor" v-model="content"></vue-editor>
            </ClientOnly>
          </div>

          <div class="w-2/4">
            <div v-if="showPreview" v-html="content" class="ql-preview" id="preview" />
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <button class="relative block text-center hover:cursor-n-resize" id="btn-resize" @mousedown="startDrag">
        <span><font-awesome-icon :icon="['fas', 'arrows-alt-v']" /></span>
      </button>

      <div class="block lg:flex gap-x-4">
        <div class="w-2/3 mb-3">
          <input v-model="projectName" type="text" placeholder="Nome do projeto">
          <input v-model="projectUrl" type="text" placeholder="Url">
        </div>

        <div class="flex w-1/5 my-6 lg:m-0">
          <button class="button border-2 border-red-500 text-red-500" @click="emitCloseModal">
            Cancel
          </button>

          <button class="disabled:opacity-75 disabled:cursor-not-allowed button border-2 border-g1 text-g1 ml-3"
            :disabled="!canSendProject" @click="emitContentData">
            Send
          </button>
        </div>
      </div>

      <div class="">
        <div>
          <textarea cols="30" v-model="projectDescription" rows="10" placeholder="description"
          class="bg-gray-50 border border-gray-300 bg-transparent text-sm text-g1 rounded-md w-full p-2.5 mb-6" />
        </div>

        <div class="mb-10">
          <h2 id="accordion-collapse-heading-3">
            <button type="button"
              class="flex items-center justify-between w-full p-5 font-medium text-left text-g1 border border-white rounded-md"
              @click="toggleImageAcordion">
              <span>Adicionar Imagens</span>

              <svg class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
          </h2>

          <div :class="imagesClass">
            <div class="p-5 border border-t-0 border-white max-h-64 overflow-y-scroll">
              <ul class="">
                <button class="button border-2 border-blue-500 text-blue-500 ml-6 mb-6" @click="insertNewImage">
                  Adicionar imagem
                </button>

                <div>
                  <li v-for="(image, index) in selectImages" :key="index" class="grid w-full gap-6 md:grid-cols-2">
                    <div class="w-full">
                      <label for="url">URl</label>
                      <input class="mt-4" id="url" type="text" v-model="image.url">
                    </div>

                    <div class="w-full">
                      <label for="description">Descrição</label>
                      <div class="flex">
                        <input class="mt-4" id="description" type="text" v-model="image.description">

                        <button class="p-4" @click="removeImage(index)">
                          <ClientOnly>
                            <font-awesome-icon class="text-red-500" :icon="['fa', 'trash-alt']" />
                          </ClientOnly>
                        </button>
                      </div>
                    </div>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>

        <div class="mb-10">
          <h2 id="accordion-collapse-heading-3">
            <button type="button"
              class="flex items-center justify-between w-full p-5 font-medium text-left text-g1 border border-white rounded-md"
              @click="toggleSkillAcordion">
              <span>Escolher Ferramentas</span>
              <svg class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
          </h2>

          <div :class="skillsClass" aria-labelledby="accordion-collapse-heading-3">
            <div class="p-5 border border-t-0 border-white max-h-64 overflow-y-scroll">
              <ul class="grid w-full gap-6 md:grid-cols-3">
                <li v-for="(skill, index) in skills" :key="index">
                  <input type="checkbox" :id="skill.name" :value="skill" style="display: none;" class="hidden peer"
                    @input="insertSkill(skill._id)">
                  <label :for="skill.name"
                    :class="activeSKillClass(skill._id)"
                    class="inline-flex items-center justify-between w-full p-5 text-gray-500 border-2 rounded-lg cursor-pointer">
                    <div class="block">
                      <div class="skill-logo h-16 w-16 flex items-center justify-center p-2" v-html="skill.image">
                      </div>
                      <div class="w-full text-lg font-semibold">{{ skill.name }}</div>
                    </div>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { VueEditor } from 'vue3-editor'
import 'quill/dist/quill.bubble.css'

const props = defineProps({
  type: { type: String },
  isActive: { type: Boolean },
  itemToEdit: { type: Object },
  skills: { type: Array }
})

let isEditing = ref(false)
let showPreview = ref(false)
let content = ref('')
let title = ref('')
let postImage = ref('')
let dragging = ref(false)
let dividerPosition = ref(null)
let editorSize = ref(null)
let showEditor = ref(true)
let x = ref(null)
let y = ref(null)
let selectSkills = ref([])
let skillsClass = ref('hidden')
let selectImages = ref([])
let imagesClass = ref('hidden')
let projectName = ref('')
let projectDescription = ref('')
let projectUrl = ref('')

// watchers 
watch(() => props.itemToEdit, async (value) => {
  const deepClone = { ...value }

  if (props.type === 'post') {
    content.value = deepClone.content
    title.value = deepClone.title
    postImage.value = deepClone.img
  } else {
    projectName.value = deepClone.name
    projectDescription.value = deepClone.description
    projectUrl.value = deepClone.url
    selectSkills.value = deepClone.skills?.length ? deepClone.skills.map(skill => skill._id) : []
    selectImages.value = deepClone.images
  }

  isEditing.value = Object.keys(deepClone).length !== 0 ? true : false
})

// emits
const emit = defineEmits(['close', 'post', 'project'])

//computeds
const canSendContent = computed(() => {
  return title.value && content.value
})

const canSendProject = computed(() => {
  return projectName.value && projectDescription.value && !selectSkills.length
})

const contentDisplay = computed(() => {
  return !showPreview.value ? 'block' : 'flex gap-x-4'
})

const editorWidth = computed(() => {
  return !showPreview.value ? 'w-full' : 'w-2/4'
})

// methods
const startDrag = (event) => {
  if (process.client) {
    window.addEventListener('mousemove', doDrag)
    dragging.value = true
    x.value = y.value = 0
  }
}

const doDrag = (event) => {
  const percentage = 100 - ((event.pageY / window.innerHeight) * 100);

  if (dragging.value) {
    if (percentage >= 2) {
      if (percentage >= 100) {
        dividerPosition.value = 100
        editorSize.value = 0
      } else {
        dividerPosition.value = percentage.toFixed(2)
        editorSize.value = event.layerY
        showEditor.value = true
      }
    } else {
      showEditor.value = false
      return false
    }
  }
}

const stopDrag = () => {
  dragging.value = false
  x.value = y.value = 'no'
}

const resetModal = () => {
  title.value = ''
  postImage.value = ''
  content.value = ''
  isEditing.value = false
  selectSkills.value = []
  skillsClass.value = 'hidden'
  selectImages.value = []
  imagesClass.value = 'hidden'
  projectName.value = ''
  projectDescription.value = ''
  projectUrl.value = ''
}

const activeSKillClass = (id) => {
  if (process.client) {
   return selectSkills.value.includes(id) ? 'border-g1 bg-g3 text-white' : 'dark:hover:text-gray-300 dark:border-gray-700 hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-g4 dark:hover:bg-g3'

    // return result
  }
}

const emitCloseModal = () => {
  emit('close', false)
  resetModal()
}

const emitContentData = () => {
  const method = isEditing.value ? 'PUT' : 'POST'

  if (props.type === 'post') {
    const newPost = {
      _id: isEditing.value ? props.itemToEdit._id : '',
      img: postImage.value,
      title: title.value,
      content: content.value,
      method
    }

    emit('post', newPost)
  } else {
    const skills = [...selectSkills.value]

    const newProject = {
      _id: isEditing.value ? props.itemToEdit._id : '',
      url: projectUrl.value,
      images: selectImages.value,
      name: projectName.value,
      description: projectDescription.value,
      skills: skills,
      method
    }

    emit('project', newProject)
  }
}

const insertSkill = (id) => {
  var i = selectSkills.value.findIndex(skill => skill === id)

  if (i >= 0) {
    selectSkills.value.splice(i, 1)
  } else {
    selectSkills.value.push(id)
  }
}

const insertNewImage = () => {
  const newIamge = {
    url: '',
    description: ''
  }

  console.log('newIamge', newIamge,  selectImages)

  selectImages.value.push(newIamge)
}

const removeImage = (index) => {
  selectImages.value.splice(index, 1)
}

const toggleSkillAcordion = () => {
  !!skillsClass.value ? skillsClass.value = '' : skillsClass.value = 'hidden'
}

const toggleImageAcordion = () => {
  !!imagesClass.value ? imagesClass.value = '' : imagesClass.value = 'hidden'
}

// lifecycle
onMounted(() => {
  if (process.client) {
    window.addEventListener('mouseup', stopDrag)
    dragging.value = true
    x.value = y.value = 0
  }
})
</script>

<style lang="scss" scoped>
.fixed-modal {
  position: fixed;
  width: 100%;
  // height: 97%;
  height: 92vh;
  overflow-y: auto;
  bottom: 0;
  padding: 20px;
  z-index: 99;
  overflow-y: auto;
}

#btn-resize {
  top: -15px;
  width: 29px;
  height: 29px;
  background: #333;
  border: 1px solid #333;
  border-radius: 50%;
  line-height: 23px;
  font-size: 20px;
}

.button {
  padding: 0 23px;
  height: 40px;
  background: transparent;
  border-radius: 4px;
  font-size: 14px;
  text-transform: uppercase;
}

input {
  display: block;
  width: 100%;
  padding: 0 20px;
  background: transparent;
  border: 1px solid white;
  border-radius: 5px;
  height: 50px;
  line-height: 46px;
  margin-bottom: 20px;
  outline: none;
  color: #42b883;
  font-size: 15px;
  letter-spacing: 0.1px;
}

.ql-preview {
  overflow-x: hidden;
  border: 1px solid #fff;

  img {
    width: 100%;
  }
}
</style>
