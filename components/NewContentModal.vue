<template>
  <div class="fixed-modal left-0 p-0 overflow-hidden bg-g4" v-if="isActive" id="fixed-modal"
    :style="{ height: `${dividerPosition}%` }">
    <button class="relative block text-center hover:cursor-n-resize" id="btn-resize" @mousedown="startDrag">
      <span><font-awesome-icon :icon="['fas', 'arrows-alt-v']" /></span>
    </button>
    <!-- <span id="btn-resize" @mousedown="startDrag"><font-awesome-icon :icon="['fas', 'arrows-alt-v']"/></span> -->
    <div class="w-full">

      <div class="block lg:flex gap-x-4">
        <div class="w-2/3">
          <input v-model="title" type="text" placeholder="Title">
          <input id="img" v-model="postImage" type="text" placeholder="Img URL">
        </div>

        <div class="flex w-1/5 my-6 lg:m-0">
          <button class="button border-2 border-red-500 text-red-500" @click="EmitCloseModal">
            Cancel
          </button>

          <button class="button border-2 border-blue-500 text-blue-500 ml-6" @click="showPreview = !showPreview">
            Preview
          </button>

          <button class="disabled:opacity-75 disabled:cursor-not-allowed button border-2 border-g1 text-g1 ml-6"
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
</template>

<script setup>
import { VueEditor } from 'vue3-editor'
import 'quill/dist/quill.bubble.css'

const props = defineProps({
  isActive: { type: Boolean },
  itemToEdit: { type: Object }
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

// watchers 
watch(() => props.itemToEdit, (value) => {
  content.value = value.content
  title.value = value.title
  postImage.value = value.img
  isEditing.value = true
}, { immediate: true })


// emits
const emit = defineEmits(['close', 'post'])

//computeds
const canSendContent = computed(() => {
  return title.value && content.value
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

const reserModal = () => {
  title.value = ''
  postImage.value = ''
  content.value = ''
  isEditing.value = false
}

const EmitCloseModal = () => {
  emit('close', false)
  reserModal()
}

const emitContentData = () => {
  const method = isEditing.value ? 'PUT' : 'POST'

  const newPost = {
    _id: isEditing.value ? props.itemToEdit._id : '',
    img: postImage.value,
    title: title.value,
    content: content.value,
    method
  }

  emit('post', newPost)
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
  overflow: hidden;
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
  border: 1px solid #c6c9d8;
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
