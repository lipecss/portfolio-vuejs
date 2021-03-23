import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import { myMixins } from '@/mixins'
import FlagIcon from 'vue-flag-icon'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSecureHTML from 'vue-html-secure'
import Donut from 'vue-css-donut-chart'
import 'vue-css-donut-chart/dist/vcdonut.css'
import VueTypedJs from 'vue-typed-js'

// Plugins
import i18n from './i18n'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab, faLinkedinIn, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(far)
library.add(fas)
library.add(fab, faLinkedinIn, faInstagram, faGithub)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// Make BootstrapVue available throughout project
Vue.use(BootstrapVue)

// Vue VueSecureHTML
Vue.use(VueSecureHTML)

// vue-donut-chart
Vue.use(Donut)

Vue.mixin(myMixins)

// Vue Meta
Vue.use(VueMeta)

// VueFlag
Vue.use(FlagIcon)

// Pusher
Vue.use(require('vue-pusher'), {
  api_key: process.env.VUE_APP_PUSHER_APP_KEY,
  options: {
    cluster: 'us2',
    encrypted: true
  }
})

// VueTypedJs
Vue.use(VueTypedJs)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
}).$mount('#app')
