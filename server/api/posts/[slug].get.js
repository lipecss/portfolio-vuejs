import { Post } from '../../models/Post'

export default defineEventHandler(async (event) => {
  const query = getRouterParams(event)
  try {
    const { slug } = query
    const post = await Post.findOne({ slug })

    if (!post) return { message: 'Post not found or not Exist' }

    return post
  } catch (error) {
    return { message: 'Failed to process your request, verify syntax is correct' }
  }
})
