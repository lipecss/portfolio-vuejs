// Helpers de texto para posts (o conteúdo é HTML do Quill, com imagens em base64).
const ENTITIES = { '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" }

export const plainText = (html = '') =>
  html
    .replace(/<img[^>]*>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|amp|lt|gt|quot|#39);/g, (m) => ENTITIES[m])
    .replace(/\s+/g, ' ')
    .trim()

export const readingMinutes = (text = '') => Math.max(1, Math.round(text.split(' ').filter(Boolean).length / 200))

export const excerptOf = (text = '', size = 170) => (text.length > size ? `${text.slice(0, size).trimEnd()}…` : text)
