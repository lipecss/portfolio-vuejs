<template>
  <div class="syetem-body-page">
    <h1>System Body Page View</h1>
    <input type="text" v-model="postImage" placeholder="Your image url">
    <input type="text" v-model="title" placeholder="Your title">
    <b-container>
      <b-row>
        <b-col cols="6">
          <quill-editor
          v-model="content"
          ref="myQuillEditor"
          />
        </b-col>
      </b-row>
    </b-container>
    <button @click="newPost">ENviar</button>
    <router-view/>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

import { newPost } from '../../services/api'

export default {
  name: 'SystemBodyPage',
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  data () {
    return {
      postImage: '',
      title: '',
      content: ''
    }
  },
  components: {
    quillEditor
  },
  computed: {},
  methods: {
    async newPost () {
      const result = await newPost(this.postImage, this.title, this.content)
      console.log(result)
    }
  },
  filters: {},
  watch: {}
}
</script>

<style scoped lang="scss">
</style>
