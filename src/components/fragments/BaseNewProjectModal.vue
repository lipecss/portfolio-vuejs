<template>
  <transition name="modal">
    <div class="fixed-modal" v-if="isActive" id="fixed-modal">
      <span id="btn-resize"><font-awesome-icon :icon="['fas', 'arrows-alt-v']"/></span>

      <b-container fluid>

        <!-- buttons area -->
        <b-row style="padding-bottom: 20px; padding-right: 15px;" align-h="end">
          <button class="button" style="border: 2px solid #dc3545; color: #dc3545;" @click="closeModal">Cancel</button>
          <button class="button" style="margin-left: 20px;" @click="emitProjectDatas">Send</button>
        </b-row>
        <!-- End buttons area -->

        <!-- inputs area -->
        <b-row>
          <b-col cols="12" lg="6" md="6">
            <div class="name">
              <input id="name" v-model="name" size="lg" type="text" placeholder="name">
            </div>
          </b-col>
          <b-col lg="6" md="6">
            <p>Skills</p>
            <b-form-group>
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="skillsSelected"
                name="flavour-2"
              >
                <label v-for="(skill, index) in skills" :key="index" class="skill-list">
                  <b-form-checkbox :value="skill.name">{{ skill.name }}</b-form-checkbox>
                </label>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="6" md="6">
            <div class="description">
              <p>Description</p>
              <b-form-textarea
                id="textarea"
                v-model="description"
                placeholder="Enter description..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </div>
          </b-col>

          <b-col lg="6" md="6" class="p-0">
            <div class="images">
              <p>Images</p>
              <b-input-group
                key="lg"
                size="lg"
                class="mb-3"
                ref="images"
              >
                <b-form-input type="text" v-model="imgString"></b-form-input>
                <b-input-group-append>
                <b-button size="sm" @click="addImage">Add</b-button>
              </b-input-group-append>
              </b-input-group>

              <ul v-for="(image, index) in images" :key="index" class="p-0">
                <li>
                  <label>{{image}}</label>
                  <div class="actions">
                    <button class="button" style="border: 2px solid #dc3545; color: #dc3545;" @click="removeImage(image)">Delete</button>
                  </div>
                </li>
              </ul>
            </div>
          </b-col>

        </b-row>
        <!-- End inputs area -->
      </b-container>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'BaseNewProjectModal',
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
      description: '',
      name: '',
      images: [],
      imgString: '',
      isEditing: false,
      showPreview: false,
      skillsSelected: [],
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
    itemToEdit: { type: Object },
    skills: { type: Array }
  },
  components: {},
  computed: {},
  methods: {
    closeModal () {
      this.$emit('close', false)
      this.reserModal()
    },
    reserModal () {
      // reset all input and textarea
      this.name = ''
      this.images = []
      this.imgString = ''
      this.description = ''
      this.skillsSelected = []
      this.isEditing = false
    },
    emitProjectDatas () {
      const status = this.isEditing ? 'edit' : 'create'

      const newProject = {
        _id: this.isEditing ? this.itemToEdit._id : null,
        name: this.name,
        description: this.description,
        images: this.images,
        skills: this.skillsSelected,
        status
      }

      this.$emit('project', newProject)
    },
    addImage () {
      if (this.imgString) {
        this.images.push(this.imgString)
        this.$refs.images.focus()
        this.imgString = ''
      }
    },
    removeImage (item) {
      if (this.images.length >= 1) {
        const index = this.images.indexOf(item)
        this.images.splice(index, 1)
      }
    }
  },
  filters: {},
  watch: {
    description (newvalue, oldValue) {
      if (newvalue !== oldValue) {
        var elem = document.getElementById('preview')
        if (elem) elem.scrollTop = elem.scrollHeight
      }
    },
    itemToEdit (value) {
      if (value !== null) {
        this.postImage = value.img
        this.name = value.name
        this.description = value.description
        this.isEditing = true
      }
    },
    isEditing (value) {
      if (value === false) {
        this.reserModal()
      }
    },
    isActive (value) {
      if (!value) this.reserModal()
    }
  }
}
</script>

<style lang="scss">
.input {
  height: 30px;
  position: absolute;
  left: -260px;
}

.fixed-modal {
  position: fixed;
  width: 100%;
  // height: 97%;
  height: 92vh;
  overflow-y: auto;
  background: $default-gray;
  bottom: 0;
  padding: 20px;
  z-index: 99;
  color: #fff;
}

.resize {
  resize: vertical;
  overflow: auto;
}

#btn-resize {
  position: relative;
  top: -10px;
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

// Skills area
.skill-list label {
  color: $vue-green;
}

// Image area
.images {
  .actions {

  }
  ul {
    li {
      display: flex;
      padding: 10px;
      justify-content: space-between;
      align-items: center;
      background: #333;
      color: $default-gray;
    }
  }
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
