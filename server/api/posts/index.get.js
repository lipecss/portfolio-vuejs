import { Post } from '../../models/Post'

export default defineEventHandler(async (event) => {
  try {
    const posts = await Post.find({})

    if (!posts) return { message: 'Filed to get Posts' }
    return posts
  } catch (error) {
    return {
      message: 'Failed to process your request, verify syntax is correct'
    }
  }
})
