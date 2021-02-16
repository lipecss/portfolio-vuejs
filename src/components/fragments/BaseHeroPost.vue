<template>
  <b-container fluid :style="style">
    <b-row>
      <b-col cols="12" lg="12" class="">
        <div class="text-center">
          <h2 class="title">{{ title }}</h2>
          <ul class="blog-meta justify-content-center align-items-center">
            <li><font-awesome-icon :icon="['far', 'calendar-alt']" /> {{ sanitizedDate }}</li>
            <li><font-awesome-icon :icon="['far', 'smile']" /> Felipecss</li>
            <li><font-awesome-icon :icon="['far', 'heart']" /> Like</li>
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
  mounted () {
  },
  beforeUpdate () {},
  updated () {},
  destroyed () {},
  data () {
    return {}
  },
  props: {
    urlImg: { type: String, required: true },
    title: { type: String, required: true },
    options: { type: Array },
    date: { type: String }
  },
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
        backgroundSize: 'cover',
        padding: '190px 0'
      }
    }
  },
  methods: {
    changeSkill () {
      for (let i = 1; i <= this.skills.length; i++) {
        const delay = i * 300
        setTimeout(function () {
        }, delay)
      }
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
  background: -webkit-linear-gradient(145deg,#5b7363,$vue-green);
  background: -webkit-linear-gradient(305deg,#5b7363,$vue-green);
  background: linear-gradient(145deg,#5b7363,$vue-green);
  font-family: Montserrat,sans-serif;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.blog-meta {
  margin: 0 -15px;
  flex-wrap: wrap;
  position: absolute;
  width: 100%;
  bottom: -135px;
  list-style: none;

  li {
    font-size: 16px;
    color: #c6c9d8;
    margin: 0 15px 13px;
  }
  svg {
    margin-right: 13px;
    font-size: 22px;
  }
}
</style>
