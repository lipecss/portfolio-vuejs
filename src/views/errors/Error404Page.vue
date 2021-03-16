<template>
  <div class="error404">
    <b-container fluid>
      <b-row>
        <b-col cols="12" class="text-center">
          <div div class="inner">
            <h1 class="title gradient-text">404!</h1>
            <h3 class="sub-title">{{ $t('pages.error.404Page.html.title')}}</h3>
            <span>{{ $t('pages.error.404Page.html.information')}}</span>
            <router-link to="/" class="error-button">{{ $t('buttons.home')}}</router-link>
        </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Error404Page',
  metaInfo: {
    title: '404 Page'
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
  data () {
    return {}
  },
  computed: {},
  methods: {},
  filters: {},
  watch: {}
}
</script>

<style scoped lang="scss">
.error404 {
  // height: calc(100vh - 142px);
  min-height: 805px;
  display: flex;
  align-items: center;
  background: $default-gray;
  color: #fff;
}

.title {
  font-size: 107px;
  // font-size: 180px;
  line-height: 1;
  margin-bottom: 0;
  font-weight: 700;
}

.sub-title {
  font-size: 40px;
  font-weight: 400;
}

span {
  font-size: 16px;
  margin-top: 10px;
  color: $middle-gray;
  opacity: .75;
  font-weight: 300;
  display: block;
  margin-bottom: 28px;
}

.error-button {
  margin-top: 35px;
  transition: 0.7s;
  background: $vue-green;
  border: 2px solid $vue-green;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 2px;
  padding: 15px 40px;
  display: inline-block;
}
</style>
