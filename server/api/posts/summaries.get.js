import { Post } from '../../models/Post'

// Lista leve para a página de posts (sem o conteúdo, que tem MBs de base64).
// Calcula tempo de leitura e trecho no servidor e guarda em cache por alguns minutos.
export default defineCachedEventHandler(async () => {
  try {
    const posts = await Post.find().select('title slug content likes created_at').sort({ created_at: 1 }).lean()

    return posts
      .map((post, index) => {
        const text = plainText(post.content)

        return {
          n: index + 1,
          slug: post.slug,
          title: post.title,
          likes: post.likes || 0,
          created_at: post.created_at,
          readMin: readingMinutes(text),
          excerpt: excerptOf(text)
        }
      })
      .reverse()
  } catch (error) {
    return []
  }
}, { maxAge: 120, swr: true, name: 'post-summaries' })
