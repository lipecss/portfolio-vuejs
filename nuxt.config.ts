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
      ]
    }
  },
  css: [
    '@/assets/css/main.scss',
    '@/assets/fonts/roobert.css',
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
  image: {
    dir: 'public'
  },
  nitro: {
    plugins: ['~/server/index.js']
  },
  render: {
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },
    http2: {
      push: true,
      cache: {
        max: 100,
        maxAge: 1000 * 60 * 60 // 1 hora
      }
    },
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
