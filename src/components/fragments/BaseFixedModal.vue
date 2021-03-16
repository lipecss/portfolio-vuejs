<template>
  <transition name="modal">
    <div class="fixed-modal" v-if="isActive" id="fixed-modal" :style="{ height: `${dividerPosition}%` }">
      <span id="btn-resize"><font-awesome-icon :icon="['fas', 'arrows-alt-v']"/></span>
      <!-- <span id="btn-resize" @mousedown="startDrag"><font-awesome-icon :icon="['fas', 'arrows-alt-v']"/></span> -->
      <b-container fluid>

        <!-- buttons area -->
        <b-row style="padding-bottom: 20px; padding-right: 15px;" align-h="end">
          <button class="button" style="border: 2px solid #dc3545; color: #dc3545;" @click="closeModal">Cancel</button>
          <button class="button" style="margin-left: 20px;" @click="emitPostDatas">Send</button>
        </b-row>
        <!-- End buttons area -->

        <!-- inputs area -->
        <b-row>
          <b-col cols="12" lg="6" md="6">
            <div class="title">
              <input id="title" v-model="title" size="lg" type="text" placeholder="Title">
            </div>
          </b-col>
          <b-col cols="12" lg="6" md="6">
            <div class="title">
              <input id="img" v-model="postImage" size="lg" type="text" placeholder="Img URL">
            </div>
          </b-col>
        </b-row>
        <!-- End inputs area -->

        <b-row style="padding-top: 20px" align-h="end">
          <b-col cols="12" lg="6" md="6">
            <button class="button" @click="showPreview = !showPreview">Preview</button>
          </b-col>
        </b-row>

        <!-- markdown editor area -->
        <b-row style="padding-top: 20px">
          <b-col cols="12" :md="showPreview ? 6 : 12">
            <vue-editor :editorOptions="editorSettings" v-model="content" :style="{ height: `${editorSize}px` }" class="resize"></vue-editor>
          </b-col>
          <b-col cols="12" :md="showPreview ? 6 : 12">
             <div v-html-safe="content" class="ql-editor" id="preview" v-if="showPreview"></div>
          </b-col>
        </b-row>
        <!-- markdown editor area -->
      </b-container>
    </div>
  </transition>
</template>

<script>
import { VueEditor, Quill } from 'vue2-editor'
import ImageResize from 'quill-image-resize-vue'
import { ImageDrop } from 'quill-image-drop-module'

Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)

export default {
  name: 'BaseFixedModal',
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    window.addEventListener('mouseup', this.stopDrag)
  },
  beforeUpdate () {},
  updated () {},
  destroyed () {},
  data () {
    return {
      content: '',
      title: '',
      postImage: '',
      dividerPosition: null,
      editorSize: null,
      dragging: false,
      isEditing: false,
      showPreview: false,
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: {}
        }
      }
    }
  },
  props: {
    isActive: { type: Boolean },
    itemToEdit: { type: Object }
  },
  components: {
    VueEditor
  },
  computed: {},
  methods: {
    closeModal () {
      this.$emit('close', false)
      this.reserModal()
    },
    reserModal () {
      // reset all input and textarea
      this.title = ''
      this.postImage = ''
      this.content = ''
      this.isEditing = false
    },
    emitPostDatas () {
      const status = this.isEditing ? 'edit' : 'create'

      const newPost = {
        _id: this.isEditing ? this.itemToEdit._id : '',
        img: this.postImage,
        title: this.title,
        content: this.content,
        status
      }

      this.$emit('post', newPost)
    },
    startDrag (event) {
      window.addEventListener('mousemove', this.doDrag)
      this.dragging = true
      this.x = this.y = 0
    },
    stopDrag () {
      this.dragging = false
      this.x = this.y = 'no'
    },
    doDrag (event) {
      if (this.dragging) {
        // const percentage = (event.layerY * 10) / 100
        const percentage = (event.pageY / window.innerHeight) * 100

        if (percentage >= 50 && percentage <= 92) {
          this.dividerPosition = percentage.toFixed(2)
          this.editorSize = event.layerY
        } else {
          return false
        }
      }
    }
  },
  filters: {},
  watch: {
    content (newvalue, oldValue) {
      if (newvalue !== oldValue) {
        var elem = document.getElementById('preview')
        if (elem) elem.scrollTop = elem.scrollHeight
      }
    },
    itemToEdit (value) {
      if (value !== null) {
        this.postImage = value.img
        this.title = value.title
        this.content = value.content
        this.isEditing = true
      }
    },
    isEditing (value) {
      if (value === false) {
        this.reserModal()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fixed-modal {
  position: fixed;
  width: 100%;
  // height: 97%;
  height: 100vh;
  overflow-y: auto;
  background: $default-gray;
  bottom: 0;
  padding: 20px;
  z-index: 99;
}

.resize {
  resize: vertical;
  overflow: auto;
}

#btn-resize {
  position: relative;
  top: -39px;
  display: block;
  width: 32px;
  height: 32px;
  margin-left: 20px;
  background: #333;
  border: 1px solid #333;
  border-radius: 50%;
  line-height: 33px;
  color: #42b883;
  font-size: 25px;
  text-align: center;

  &:hover {
    cursor: n-resize;
  }
}

.button {
  padding: 0 23px;
  height: 40px;
  border: 2px solid #42b883;
  color: #42b883;
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

// transition

.modal-enter-active,
.modal-leave-active {
  transition: height 1s ease-in-out;
  overflow: hidden;
}

.modal-enter,
.modal-leave-to {
  height: 0;
}

#preview {
  overflow: auto !important;
  max-height: 610px!important;
  height: 610px;
  border: 1px solid #fff;
  color: #fff;
  img {
    width: 100%;
  }
}
</style>
