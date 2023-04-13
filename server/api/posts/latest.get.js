import { Post } from '../../models/Post'

export default defineEventHandler(async (req, res) => {
  try {
    const posts = await Post.find().limit(6).sort({ 'created_at': -1 })

    return posts
  } catch (error) {
    return { message: 'Failed to process your request, verify syntax is correct' }
  }
})
