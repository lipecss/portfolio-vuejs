<template>
  <div class="syetem-body-page">
    <b-container>
      <b-row>
        <b-col cols="6">
          <RichTextEditor/>
        </b-col>
      </b-row>
    </b-container>
    <button @click="newPost">ENviar</button>
    <router-view/>
  </div>
</template>

<script>
import { newPost } from '../../services/api'
const RichTextEditor = () => import('@/components/fragments/BaseRichTextEditor')

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
      postImage: ''
    }
  },
  components: {
    RichTextEditor
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
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';
</style>
