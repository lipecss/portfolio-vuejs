import { Post } from '../../models/Post'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  try {
    const { page, limit } = query

    const options = {
      page: page ? page : 1,
      limit: limit ? limit : 3
    }

    const result = await Post.paginate({}, options)
    return result
  } catch (error) {
    return { message: 'Failed to process your request, verify syntax is correct' }
  }
})
