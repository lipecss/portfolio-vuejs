import { Post } from '../../models/Post'
import { Project } from '../../models/Project'

// Fonte dinâmica do sitemap: posts e projetos publicados.
export default defineEventHandler(async () => {
  try {
    const [posts, projects] = await Promise.all([
      Post.find().select('slug updated_at').lean(),
      Project.find().select('slug updated_at').lean()
    ])

    const toUrl = (base) => (doc) => ({ loc: `${base}/${doc.slug}`, lastmod: doc.updated_at })

    return [...posts.map(toUrl('/post')), ...projects.map(toUrl('/project'))]
  } catch (error) {
    return []
  }
})
