// Conteúdo da home. Links com `null` ainda não têm destino e aparecem desabilitados.
export const links = {
  cv: null,
  twitch: 'https://www.twitch.tv/felipecss',
  github: 'https://github.com/lipecss',
  xbox: null,
  music: null
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
  name: 'Encurtee.me',
  url: 'https://encurtee.me',
  description: 'Encurtador de URLs com analytics e plano pago. Do primeiro commit à primeira cobrança.',
  loot: ['Nuxt', 'Supabase', 'Stripe', 'Vercel']
}

// Preencher `name`, `image` e `url` conforme os projetos forem entrando.
export const sideQuests = [
  { n: '01', name: '[Nome do projeto]', url: null, image: null },
  { n: '02', name: '[Nome do projeto]', url: null, image: null },
  { n: '03', name: '[Nome do projeto]', url: null, image: null }
]
