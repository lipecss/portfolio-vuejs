// Conteúdo estático da home. Os projetos e os posts vêm da API (Mongo).
export const links = {
  twitch: 'https://www.twitch.tv/felipecss',
  github: 'https://github.com/lipecss'
}

// As skills vêm do Mongo (/api/skills/names); o Mongo não guarda categoria nem nome de exibição,
// então eles ficam aqui. Skill nova sem entrada no mapa cai em "OUTROS".
export const skillMeta = {
  HTML: { cat: 'FRONT' },
  CSS: { cat: 'FRONT' },
  Javascript: { label: 'JavaScript', cat: 'FRONT' },
  TypeScript: { cat: 'FRONT' },
  Vuejs: { label: 'Vue.js', cat: 'FRONT' },
  Nuxt: { cat: 'FRONT' },
  Reactjs: { label: 'React', cat: 'FRONT' },
  Talwind: { label: 'Tailwind', cat: 'FRONT' },
  Pinia: { cat: 'FRONT' },
  Vite: { cat: 'FRONT' },
  PrimeVue: { cat: 'FRONT' },
  Vuetify: { cat: 'FRONT' },
  Nodejs: { label: 'Node.js', cat: 'BACK' },
  Express: { cat: 'BACK' },
  Deno: { cat: 'BACK' },
  Firebase: { cat: 'BACK' },
  Supabase: { cat: 'BACK' },
  Pusher: { cat: 'BACK' },
  Stripe: { cat: 'BACK' },
  Cypress: { cat: 'FERRAMENTAS' },
  Jest: { cat: 'FERRAMENTAS' },
  Docker: { cat: 'FERRAMENTAS' },
  Unity: { cat: 'GAMES' }
}

export const skillLabel = (name) => skillMeta[name]?.label || name

export const categoryOrder = ['FRONT', 'BACK', 'FERRAMENTAS', 'GAMES', 'OUTROS']

// Usado só se a API não responder.
export const fallbackSkills = ['HTML', 'CSS', 'Javascript', 'Vuejs', 'Nuxt', 'Reactjs', 'Talwind', 'Nodejs', 'Express', 'Cypress', 'Unity']
  .map((name) => ({ name }))

export const ticker = ['Vue.js', 'Nuxt', 'Node.js', 'Supabase', 'Tailwind', 'React', 'MongoDB', 'Unity', 'Cypress', 'Linux', 'Twitch', 'Valorant']

export const traits = [
  { label: 'Criatividade', color: 'var(--arc-acc)' },
  { label: 'Trabalho em equipe', color: 'var(--arc-yel)' },
  { label: 'Solucionador de problemas', color: 'var(--arc-lil)' },
  { label: 'Autodidata', color: 'var(--arc-ink)' }
]

export const mainQuest = {
  slug: 'encurtee-me', // slug do projeto no Mongo; dele vêm o link
  name: 'Encurtee.me',
  url: 'https://encurtee.me',
  description: 'Encurtador de URLs com analytics e plano pago. Do primeiro commit à primeira cobrança.',
  loot: ['Nuxt', 'Supabase', 'Stripe', 'Vercel']
}

