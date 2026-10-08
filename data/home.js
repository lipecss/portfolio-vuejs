// Conteúdo estático da home. Os projetos e os posts vêm da API (Mongo).
export const links = {
  twitch: 'https://www.twitch.tv/felipecss',
  github: 'https://github.com/lipecss'
}

export const inventoryTabs = [
  { id: 'tudo', label: 'TUDO' },
  { id: 'FRONT', label: 'FRONT' },
  { id: 'BACK', label: 'BACK' },
  { id: 'FERRAMENTAS', label: 'FERRAMENTAS' },
  { id: 'GAMES', label: 'GAMES' }
]

export const inventory = [
  { name: 'HTML', cat: 'FRONT' },
  { name: 'CSS', cat: 'FRONT' },
  { name: 'JavaScript', cat: 'FRONT' },
  { name: 'Vue.js', cat: 'FRONT' },
  { name: 'Nuxt', cat: 'FRONT' },
  { name: 'React', cat: 'FRONT' },
  { name: 'React Native', cat: 'FRONT' },
  { name: 'Tailwind', cat: 'FRONT' },
  { name: 'Bootstrap', cat: 'FRONT' },
  { name: 'Node.js', cat: 'BACK' },
  { name: 'Express', cat: 'BACK' },
  { name: 'SQL', cat: 'BACK' },
  { name: 'MongoDB', cat: 'BACK' },
  { name: 'Cypress', cat: 'FERRAMENTAS' },
  { name: 'Git', cat: 'FERRAMENTAS' },
  { name: 'Linux', cat: 'FERRAMENTAS' },
  { name: 'C#', cat: 'GAMES' },
  { name: 'Unity', cat: 'GAMES' }
]

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

