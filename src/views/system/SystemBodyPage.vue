<template>
  <div class="system-body-page">
    <TheSystemNavBar @logout="logoutUser" />
    <b-container fluid >
      <b-row>
        <b-col cols="12" lg="12">
          <b-container>
            <b-row>
              <!-- Nav bar -->
              <b-col cols="12" sm="12" lg="2" md="3">
                <div class="tabs">
                  <div class="border-nav"></div>
                  <ul>
                    <li v-for="option in options" :key="option" @click="changeSection(option)" :class="{ active: isActive == option }">{{option}}
                    </li>
                  </ul>
                </div>
              </b-col>
              <!-- End Nav bar -->

              <b-col cols="12" md="9" lg="10">

                <div class="right-section">
                  <!-- section Post -->
                    <section v-if="isActive =='post' ">
                      <button @click="openPostModal">New Post</button>

                      <b-container class="content">
                        <b-row>
                          <b-col lg="12" class="text-center">
                            <h3 class="title">ALL Posts</h3>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col v-for="(post, index) in postList" :key="post._id" md="6" lg="6" style="padding: 10px;">
                            <div class="text-center" :style="postStyle(post.img)" @mouseenter="isHover = post._id">
                              <h3 class="post-title">{{post.title}}</h3>
                              <transition name="option-fade">
                                <div class="options" v-if="isHover === post._id">
                                  <span id="edit"><font-awesome-icon :icon="['fas', 'pencil-alt']" @click="updatePost(post)"/></span>
                                  <span id="delete"><font-awesome-icon :icon="['far', 'trash-alt']" @click="deletePost(post, index)"/></span>
                                </div>
                              </transition>
                            </div>
                          </b-col>
                        </b-row>
                      </b-container>
                        <!-- <RichTextEditor/> -->
                    </section>

                    <!-- section Project -->
                    <section v-if="isActive =='project' ">
                      <button @click="openProjectModal">New Project</button>

                      <b-container class="content">
                        <b-row>
                          <b-col lg="12" class="text-center">
                            <h3 class="title">ALL Projects</h3>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col v-for="(project,index) in projectList" :key="project._id" md="6" lg="6" style="padding: 10px;">
                            <div class="text-center" :style="postStyle(project.images[0])" @mouseenter="isHover = project._id">
                              <h3 class="post-title">{{project.name}}</h3>
                              <transition name="option-fade">
                                <div class="options" v-if="isHover === project._id">
                                  <span id="edit"><font-awesome-icon :icon="['fas', 'pencil-alt']"/></span>
                                  <span id="delete"><font-awesome-icon :icon="['far', 'trash-alt']" @click="deleteProject(project, index)"/></span>
                                </div>
                              </transition>
                            </div>
                          </b-col>
                        </b-row>
                      </b-container>
                        <!-- <RichTextEditor/> -->
                    </section>

                    <section v-if="isActive == 'analytics' ">
                      CONTENT analytics
                    </section>
                </div>

              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
      <BaseFixedModal
        :isActive="isCreatingPost"
        @close="closePostModal"
        @post="createPost"
        :itemToEdit="itemToEdit"
      />
      <BaseNewProjectModal
        :isActive="isCreatingProject"
        @close="closeProjectModal"
        @project="createProject"
        :itemToEdit="itemToEdit"
        :skills="projectSkills"
      />
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  getPosts,
  newPost,
  editPost,
  deletePost,
  getProjects,
  newProject,
  deleteProject,
  getSkills
} from '../../services/api'

export default {
  name: 'DashBoardPage',
  metaInfo () {
    return {
      title: 'System'
    }
  },
  beforeCreate () {},
  async created () {
    await this.syncPosts()
    await this.syncProjects()
  },
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  data () {
    return {
      postImage: '',
      options: ['post', 'project', 'analytics'],
      isActive: 'post',
      isHover: null,
      isCreatingPost: false,
      isCreatingProject: false,
      projectSkills: [],
      itemToEdit: null
    }
  },
  components: {
    TheSystemNavBar: () => import('@/components/layout/TheSystemNavBar'),
    BaseFixedModal: () => import('@/components/fragments/BaseFixedModal'),
    BaseNewProjectModal: () => import('@/components/fragments/BaseNewProjectModal')
  },
  computed: {
    ...mapGetters('ModulePost', ['postList']),
    ...mapGetters('ModuleProject', ['projectList'])
  },
  methods: {
    ...mapActions('ModulePost', ['setList', 'pushToList', 'removeToList', 'updateToList']),
    ...mapActions('ModuleProject', ['setProjectList', 'pushToProjectList', 'removeToProjectList', 'updateToProjectList']),
    ...mapActions('ModuleUser', ['clearUserStore']),
    openPostModal () {
      this.isCreatingPost = true
    },
    closePostModal (status) {
      this.isCreatingPost = status
      this.itemToEdit = null
    },
    async syncPosts () {
      const posts = await getPosts()
      this.setList(posts)
    },
    async createPost (post) {
      if (post.status === 'create') {
        const result = await newPost(post.img, post.title, post.content)
        if (result.status !== 'error') {
          this.pushToList(result)
          this.isCreatingPost = false
        }
      } else if (post.status === 'edit') {
        const result = await editPost(post._id, post.img, post.title, post.content)

        if (result.status !== 'error') {
          this.updateToList(result)
          this.isCreatingPost = false
        }
      }
    },
    async openProjectModal () {
      this.isCreatingProject = true

      const skills = await getSkills()
      this.projectSkills = skills
    },
    closeProjectModal (status) {
      this.isCreatingProject = status
      this.itemToEdit = null
    },
    updatePost (item) {
      this.isCreatingPost = true
      this.itemToEdit = item
    },
    async deletePost (post, index) {
      if (confirm('Do you really want to delete?')) {
        deletePost(post._id).then(() => {
          this.removeToList(index)
        })
      }
    },
    async syncProjects () {
      const projects = await getProjects()
      this.setProjectList(projects)
    },
    async createProject (project) {
      if (project.status === 'create') {
        const result = await newProject(project.name, project.description, project.images, project.skills)
        if (result.status !== 'error') {
          this.pushToProjectList(result)
          this.isCreatingProject = false
        }
      }
    },
    async deleteProject (project, index) {
      if (confirm('Do you really want to delete?')) {
        deleteProject(project._id).then(() => {
          this.removeToProjectList(index)
        })
      }
    },
    changeSection (section) {
      this.isActive = section
    },
    postStyle (img) {
      return {
        position: 'relative',
        backgroundImage: `url(${img})`,
        backgroundSize: '100% 100%',
        height: '230px',
        width: '100%',
        borderRadius: '6px'
      }
    },
    logoutUser (eventValue) {
      if (eventValue) {
        this.$router.push({ name: 'HomePage' })
        this.clearUserStore()
      }
    }
  },
  filters: {},
  watch: {}
}
</script>

<style scoped lang="scss">
.system-body-page {
  background: $default-gray;
  min-height: 100vh;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

// navbar
.tabs {
  .border-nav {
    height: 10px;
    background: linear-gradient(45deg, $vue-green, $vue-greenlight);
  }

  ul {
    background-color: $middle-gray;
    box-shadow: 1px 1px 3px 0 rgb(0 0 0 / 30%);
    list-style: none;
    font-size: 21px;
    text-transform: uppercase;
    color: #fff;
    padding-left: 0;
    margin-top: 7px;

    .active {
      background: $vue-green;
    }

    li {
      text-align: center  ;
      padding: 0.3em 0.3em 0.6em 0.8em;

      &:hover {
        background: $vue-green;
        cursor: pointer;
      }
    }
  }
}

.content {
  // padding: 6px;
  // min-height: 600px;
  // // box-shadow: 0px 2px 15px 2px rgb(101 186 101);
  // border-radius: 6px;
  color: #fff;
  height: 665px;
  overflow-y: auto;
}

.title {
  font-weight: 300;
  color: $middle-gray;
}

button {
  background: $vue-green;
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 15px 40px;
  border: 2px solid $vue-green;
  border-radius: 6px;
  display: inline-block;
  font-weight: 500;
}

.post-title {
  font-size: 20px;
  padding: 105px 0;
}

// Post options
.options {
  position: absolute;
  bottom: 0;
  right: 30px;

  span {
    font-size: 22px;
  }
  #edit {
    margin-right: 20px;
    &:hover {
      color: #007bff
    }
  }
  #delete {
    &:hover {
      color: #dc3545
    }
  }
}

.option-fade-enter-active, .option-fade-leave-active {
  transition: opacity .5s;
}
.option-fade-enter, .option-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
