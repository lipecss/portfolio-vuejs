import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    "./app/**/*.{js,vue,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        g1: '#41b883',
        g2: '#35495e',
        g3: '#009d5d',
        g4: '#18181B'
      }
    }
  }
}
