<template>
  <b-container fluid :style="style">
    <b-row class="padding">
      <b-col cols="12" lg="12" class="">
        <div class="text-center">
          <h2 class="title gradient-text">{{ title }}</h2>
          <ul class="blog-meta justify-content-center align-items-center">
            <li><font-awesome-icon :icon="['far', 'calendar-alt']" /> {{ sanitizedDate }}</li>
            <li><font-awesome-icon :icon="['far', 'smile']" /> Felipecss</li>
            <li>
              <div class="like">
                <font-awesome-icon
                :icon="[liked ? 'fas' : 'far', 'heart']"
                id="heart" @click.prevent="sendAction"
                :color="liked ? '#dc3545' : ''"
                />
                <span id="like-count">{{likes}}</span>
              </div>
            </li>
          </ul>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import moment from 'moment'

export default {
  name: 'BaseHeroPost',
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  destroyed () {},
  data () {
    return {}
  },
  props: {
    urlImg: { type: String, required: true },
    title: { type: String, required: true },
    likes: { type: Number, default: 0 },
    liked: { type: Boolean, default: false },
    options: { type: Array },
    date: { type: String }
  },
  components: {},
  computed: {
    sanitizedDate () {
      return moment(this.date).format('LL')
    },
    style () {
      const img = this.urlImg
      return {
        position: 'relative',
        backgroundImage: `url(${img})`,
        backgroundPosition: '50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }
    }
  },
  methods: {
    sendAction () {
      const id = this.$route.params.post._id
      this.$emit('action', id)
    }
  },
  filters: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.title {
  font-weight: 700;
  line-height: 90px;
  font-size: 65px;
  text-transform: uppercase;
  font-family: Montserrat,sans-serif;
}

.padding {
  padding: 190px 0px;
}

.blog-meta {
  margin: 0 -15px;
  position: absolute;
  width: 78%;
  bottom: -115px;
  // bottom: -135px;
  list-style: none;
  display: flex;

  li {
    font-size: 16px;
    color: #fff;
    margin: 0 15px 13px;
    text-shadow: 2px 1px 0px #000000;
  }
  svg {
    margin-right: 13px;
    font-size: 22px;

    &:hover {
      transform: scale(1.25);
      cursor: pointer;
    }
  }
}

.like {
  position: relative;

  #like-count {
    position: absolute;
    top: -16px;
    left: 27px;
    color: #dc3545;
    font-weight: 600;
    font-size: 22px;
  }
}

@media screen and (min-width: 768px) {
  .blog-meta {
    width: 100%;
  }
}
</style>
