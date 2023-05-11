// https://nuxt.com/docs/api/configuration/nuxt-config
import getSiteMeta from './utils/getSiteMeta'

const meta = getSiteMeta()

import sitemapRoutes from './helpers/sitemapRoutes'

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR'
      },
      title: 'Portifolio felipecss',
      meta: [
        ...meta,
        { charset: 'utf-8' },
        { name: 'robots', content: 'index, follow' },
        { name: 'keywords', content: 'felipecss, felipe, vuejs, vue, javascript, developer, development, desenvolvedor' },
        { property: 'og:image:width', content: '740' },
        { property: 'og:image:height', content: '300' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'twitter:site', content: '@felipecss' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'canonical', href: 'https://felipecss.com' },
        {
          hid: 'icon',
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.png'
        },
      ],
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js',
          crossorigin: 'anonymous',
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js',
          crossorigin: 'anonymous',
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js',
          crossorigin: 'anonymous',
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/plugins/animation.gsap.min.js',
          crossorigin: 'anonymous',
        },
        {
          src: 'https://unpkg.com/gsap@3/dist/MotionPathPlugin.min.js',
          crossorigin: 'anonymous'
        }
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
    { src: '~/plugins/aos', mode: 'client' },
    { src: '~/plugins/vue3-toastify.js', mode: 'client' },
    { src: '~/plugins/vercel.js', mode: 'client' },
    { src: '~/plugins/donut.js', mode: 'client' }
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/robots',
    '@nuxt/image-edge',
    '@nuxtjs/supabase',
    '@pinia-plugin-persistedstate/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'definePiniaStore', 'acceptHMRUpdate'],
      },
    ],
    '@nuxtjs/google-adsense',
    ['@funken-studio/sitemap-nuxt-3', { generateOnBuild: true }]
  ],
  'google-adsense': {
    id: 'ca-pub-5137005946472400'
  },
  image: {
    dir: 'public'
  },
  supabase: {
    redirect: true
  },
  sitemap: {
    hostname: 'http://localhost:3000',
    cacheTime: 1000 * 60 * 15,
    exclude: [
      '/login',
      '/dashboard/**'
    ],
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date().toISOString()
    },
  },
  nitro: {
    plugins: ['~/server/index.js']
  },
  // render: {
  //   http2: {
  //     push: true,
  //     cache: {
  //       max: 100,
  //       maxAge: 1000 * 60 * 60 // 1 hora
  //     }
  //   },
  //   static: {
  //     maxAge: 1000 * 60 * 60 * 24 * 7
  //   }
  // },
  runtimeConfig: {
    connectionString: process.env.CONNECTION_STRING,
    public: {
      baseUrl: process.env.NUXT_BASE_URL || 'http://localhost:3000',
      mongodbUri: process.env.CONNECTION_STRING,
      googleId: process.env.GOOGLE_ADSENSE_ID,
      pusherEnv: {
        appId: process.env.PUSHER_APP_ID,
        key: process.env.PUSHER_APP_KEY,
        secret: process.env.PUSHER_APP_SECRET,
        cluster: process.env.PUSHER_APP_CLUSTER
      }
    }
  }
})
