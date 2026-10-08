import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import { Post } from '../../../models/Post'

let purify
const getPurify = () => {
  if (purify) return purify

  purify = createDOMPurify(new JSDOM('').window)
  // texto colado de outros sites traz cores/fontes inline que somem no tema escuro
  purify.addHook('afterSanitizeAttributes', (node) => {
    if (!node.style) return
    for (const prop of ['color', 'background', 'background-color', 'font-family', 'font-size', 'line-height']) {
      node.style.removeProperty(prop)
    }
    if (!node.getAttribute('style')) node.removeAttribute('style')
  })

  return purify
}

// Post pronto para leitura: HTML sanitizado, índice dos títulos, tempo de leitura e número da quest.
export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event)

  const post = await Post.findOne({ slug }).lean()
  if (!post) throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })

  const dom = new JSDOM(`<body>${getPurify().sanitize(post.content || '')}</body>`)
  const { document } = dom.window

  const toc = []
  document.querySelectorAll('h1, h2, h3').forEach((heading) => {
    const title = heading.textContent.trim()
    if (!title || toc.length >= 8) return

    heading.id = `sec-${toc.length + 1}`
    toc.push({ id: heading.id, title })
  })

  document.querySelectorAll('a').forEach((a) => {
    a.setAttribute('target', '_blank')
    a.setAttribute('rel', 'noopener noreferrer')
  })
  document.querySelectorAll('img').forEach((img) => {
    img.setAttribute('loading', 'lazy')
    if (!img.getAttribute('alt')) img.setAttribute('alt', `Imagem do post ${post.title}`)
  })

  const text = plainText(post.content)

  return {
    _id: String(post._id),
    slug: post.slug,
    title: post.title,
    likes: post.likes || 0,
    created_at: post.created_at,
    n: await Post.countDocuments({ created_at: { $lte: post.created_at } }),
    readMin: readingMinutes(text),
    excerpt: excerptOf(text, 300),
    toc: toc.length > 1 ? toc : [],
    html: document.body.innerHTML
  }
})
