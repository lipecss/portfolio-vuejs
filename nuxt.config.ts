// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR'
      },
      title: 'Portifolio felipecss',
      meta: [ ]
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
