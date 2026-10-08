import { Project } from '../../models/Project'

export default defineEventHandler(async (req, res) => {
  try {
    const projects = await Project.find().select('name slug url images created_at').limit(6).sort({ 'created_at': -1 }).lean()

    return projects
  } catch (error) {
    return { message: 'Failed to process your request, verify syntax is correct' }
  }
})
