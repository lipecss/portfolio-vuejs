import { Project } from "../../models/Project"
import { Skill } from "../../models/Skill"

export default defineEventHandler(async (event) => {
  const query = getRouterParams(event)
  try {
    const { slug } = query

    await Skill.init()
    const project = await Project.findOne({ slug }).select("+skills").populate('skills')

    if (!project) {
      throw new Error('Project not found or not Exist')
    }

    else return project
  } catch (error) {
    throw new Error('Failed to process your request, verify syntax is correct')
  }
})
