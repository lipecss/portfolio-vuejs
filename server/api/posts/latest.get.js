import { Post } from '../../models/Post'

export default defineEventHandler(async (req, res) => {
  try {
    const posts = await Post.find().select('title slug img created_at').limit(6).sort({ 'created_at': -1 }).lean()

    return posts
  } catch (error) {
    return { message: 'Failed to process your request, verify syntax is correct' }
  }
})
