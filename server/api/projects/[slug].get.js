import { Project } from "../../models/Project"
import { Skill } from "../../models/Skill"

export default defineEventHandler(async (event) => {
  const query = getRouterParams(event)
  try {
    const { slug } = query
    await Skill.init() // Registrar a schema do modelo Skill
    const project = await Project.findOne({ slug }).select("+skills").populate('skills')

    if (!project) return { message: 'Post not found or not Exist' }

    return project
  } catch (error) {
    console.log('errp', error)
    return { message: 'Failed to process your request, verify syntax is correct' }
  }
})
