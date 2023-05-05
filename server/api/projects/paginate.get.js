import { Project } from '../../models/Project'
import { Skill } from '../../models/Skill'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  try {
    await Skill.init()

    const { page, limit } = query

    const options = {
      page: page ? page : 1,
      limit: limit ? limit : 3,
      lean: true,
      sort: { created_at: -1 },
      populate: 'skills'
    }

    const result = await Project.paginate({}, options)
    return result
  } catch (error) {
    return { message: 'Failed to process your request, verify syntax is correct' }
  }
})
