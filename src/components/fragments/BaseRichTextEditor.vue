<template>
  <div class="richtext-editor">
    <vue-editor :editorOptions="editorSettings" v-model="content"> </vue-editor>
  </div>
</template>

<script>
import { VueEditor, Quill } from 'vue2-editor'
import ImageResize from 'quill-image-resize-vue'
import { ImageDrop } from 'quill-image-drop-module'

Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)

export default {
  name: 'BaseRichTextEditor',
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
  },
  beforeUpdate () {},
  updated () {},
  destroyed () {},
  data () {
    return {
      content: '',
      customModulesForEditor: [
        { alias: 'imageDrop', module: ImageDrop },
        { alias: 'imageResize', module: ImageResize }
      ],
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: {}
        }
      }
    }
  },
  props: {},
  components: {
    VueEditor
  },
  computed: {},
  methods: {},
  filters: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
</style>
