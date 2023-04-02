// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR'
      },
      title: 'Portifolio felipecss',
      meta: [ ],
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js',
          body: true
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/EaselPlugin.min.js',
          body: true
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/ScrollMagic.min.js',
          body: true
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollTrigger/1.0.6/ScrollTrigger.min.js',
          body: true
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/plugins/animation.gsap.js',
          body: true
        },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/plugins/debug.addIndicators.min.js',
          body: true
        }
      ]
    }
  },
  pageTransition: {
    name: 'expand',
    mode: 'out-in'
  },
  css: [
    '@/assets/css/main.scss',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  plugins: [
    { src: '~/plugins/vue-typed-js.js', mode: 'client' }
  ],
  modules: [
    '@nuxtjs/tailwindcss'
  ]
})
