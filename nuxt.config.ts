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
          src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/MotionPathPlugin.min.js'
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
  pageTransition: {
    name: 'expand',
    mode: 'out-in'
  },
  css: [
    '@/assets/css/main.scss',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  plugins: [
    { src: '~/plugins/vue-typed-js.js', mode: 'client' },
    { src: '@/plugins/aos', mode: 'client' },
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge'
  ],
  render: {
    static: {
      maxAge: 60 * 60 * 24 * 365 // Cache for 1 year
    }
  }
})
