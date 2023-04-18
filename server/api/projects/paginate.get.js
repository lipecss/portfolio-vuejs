import { Project } from '../../models/Project'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  try {
    const { page, limit } = query

    const options = {
      page: page ? page : 1,
      limit: limit ? limit : 3,
      sort: { created_at: -1 }
    }

    const result = await Project.paginate({}, options)
    return result
  } catch (error) {
    return { message: 'Failed to process your request, verify syntax is correct' }
  }
})
