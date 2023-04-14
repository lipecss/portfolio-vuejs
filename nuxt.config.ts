// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR'
      },
      title: 'Portifolio felipecss',
      meta: [
        { name: 'robots', content: 'index, follow' },
        { name: 'description', content: 'Esse site é meu cantinho, o lugar do Felipecss, na qual você poderá conhecer um pouco de tudo, dos meus projetos, trabalhos, gostos e de mim. Estou super ansioco para trocarmos um papo!' },
        { name: 'keywords', content: 'felipecss, felipe, vuejs, vue, javascript, developer, development, desenvolvedor' }
      ],
      link: [
        { rel: 'canonical', href: 'https://felipecss.com' }
      ],
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js',
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js',
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/ScrollMagic.min.js',
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/plugins/animation.gsap.min.js',
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/plugins/debug.addIndicators.min.js',
        }
      ]
    }
  },
  css: [
    '@/assets/css/main.scss',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  imports: {
    dirs: ['stores']
  },
  plugins: [
    { src: '~/plugins/vue-typed-js.js', mode: 'client' },
    { src: '@/plugins/aos', mode: 'client' },
    { src: '~/plugins/vue3-toastify.js', mode: 'client' }
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
    '@nuxtjs/supabase',
    '@pinia-plugin-persistedstate/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'definePiniaStore', 'acceptHMRUpdate'],
      },
    ],
  ],
  nitro: {
    plugins: ['~/server/index.js']
  },
  render: {
    static: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_BASE_URL ||'http://localhost:3000',
      mongodbUri: process.env.CONNECTION_STRING,
      pusherEnv: {
        appId: process.env.PUSHER_APP_ID,
        key: process.env.PUSHER_APP_KEY,
        secret: process.env.PUSHER_APP_SECRET,
        cluster: process.env.PUSHER_APP_CLUSTER
      }
    }
  }
})
