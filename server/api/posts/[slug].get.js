import { Post } from '../../models/Post'

export default defineEventHandler(async (event) => {
  const query = getRouterParams(event)
  try {
    const { slug } = query

    const post = await Post.findOne({ slug })

    if (!post) {
      throw new Error('Post not found or not Exist')
    }

    else return post

  } catch (error) {
    throw new Error('Failed to process your request, verify syntax is correct')
  }
})

