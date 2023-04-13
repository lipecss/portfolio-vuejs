import { Project } from '../../models/Project'

export default defineEventHandler(async (req, res) => {
  try {
    const projects = await Project.find().limit(6).sort({ 'created_at': -1 })

    return projects
  } catch (error) {
    return { message: 'Failed to process your request, verify syntax is correct' }
  }
})
