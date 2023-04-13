import { Project } from '../../models/Project'

export default defineEventHandler(async (event) => {
  try {
    const projects = await Project.find({})

    if (!projects) return { message: 'Filed to get Posts' }
    return projects
  } catch (error) {
    return {
      message: 'Failed to process your request, verify syntax is correct'
    }
  }
})
