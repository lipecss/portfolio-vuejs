import mongoose from 'mongoose'
import { Project } from '../../models/Project'
import { Skill } from '../../models/Skill'

export default defineEventHandler(async (event) => {

  if (event.node.req.method === 'GET') {
    try {
      const projects = await Project.find({})

      if (!projects) return { message: 'Filed to get Posts' }
      return projects

    } catch (error) {
      return {
        message: 'Failed to process your request, verify syntax is correct'
      }
    }
  }

  if (event.node.req.method === 'POST') {
    if (!event.tokenDecoded) {
      return {
        message: 'Unauthorized',
        status: 401
      }
    } else {
      try {
        const { name, description, images, skills } = await readBody(event)

        if (!skills.length) return createError({ statusCode: 500, message: 'one of the queries failed' })

        const resultSkills = await Promise.all(skills.map(async (skill) => {
          const result = await Skill.findById({ _id: new mongoose.Types.ObjectId(skill) })
          return result
        }))

        const newProject = await new Project({
          name,
          description,
          images,
          skills: resultSkills
        }).save()

        // if (!newProject) return setResponseStatus(event, 500, 'Failes to insert project')

        return newProject

      } catch (error) {
        return setResponseStatus(event, 400, 'Failed to process your request, verify syntax is correct')
      }
    }
  }
})

