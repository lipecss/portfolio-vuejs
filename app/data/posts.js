// Tags: o Mongo não guarda categoria do post, então ela é inferida do título.
const TAG_RULES = [
  ['GAMES', /twitch|xbox|jogo|game|valorant/],
  ['ARQUITETURA', /servidor|arquitet|componentes?\b/],
  ['NUXT', /nuxt/],
  ['VUE', /\bvue/]
]

export const tagOrder = ['VUE', 'NUXT', 'ARQUITETURA', 'GAMES', 'GERAL']

const normalize = (text = '') => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export const postTag = (title) => TAG_RULES.find(([, re]) => re.test(normalize(title)))?.[0] || 'GERAL'

export const padN = (n) => String(n).padStart(2, '0')

// A cor da capa gira entre acento, amarelo e lilás, como no design.
export const coverColor = (n) => ['var(--arc-acc)', 'var(--arc-yel)', 'var(--arc-lil)'][Number(n) % 3]

const MONTHS = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']

// "16 AGO 2021" (UTC, para o servidor e o navegador mostrarem a mesma data)
export const formatPostDate = (date) => {
  const d = new Date(date)

  return `${String(d.getUTCDate()).padStart(2, '0')} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}
