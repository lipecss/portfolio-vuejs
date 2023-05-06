import mongoose from 'mongoose'
import { Project } from '../../models/Project'
import { Skill } from '../../models/Skill'

export default defineEventHandler(async (event) => {
  const query = getRouterParams(event)
  console.log('event.tokenDecoded', !!event.tokenDecoded)

  if (event.node.req.method === 'GET') {
    try {
      await Skill.init()

      const project = await Project.findOne({ slug: query.slug }).select("+skills").populate('skills')

      if (!project) return setResponseStatus(event, 400, 'Project not found or not Exist')

      return project

    } catch (error) {
      return setResponseStatus(event, 400, 'Failed to process your request, verify syntax is correct')
    }
  }

  if (event.node.req.method === 'PUT') {
    if (!event.tokenDecoded) {
      return {
        message: 'Unauthorized',
        status: 401
      }
    } else {
      try {
        const { slug: _id } = query

        const {
          name: newName,
          description: newDescription,
          images: newImages,
          skills: newSkills,
          url: newUrl
        } = await readBody(event)

        // Obtendo post
        let project = await Project.findById({ _id: new mongoose.Types.ObjectId(_id) })

        if (!project) return setResponseStatus(event, 404, 'Post not found')

        if (!newSkills.length) return createError({ statusCode: 500, message: 'one of the queries failed' })

        const resultSkills = await Promise.all(newSkills.map(async (skill) => {
          const result = await Skill.findById({ _id: new mongoose.Types.ObjectId(skill) })
          return result
        }))

        project.name = newName
        project.description = newDescription
        project.images = newImages
        project.skills = resultSkills
        project.url = newUrl

        const updated = await project.save()

        return updated

      } catch (error) {
        console.log(error)
        return setResponseStatus(event, 400, 'Failed to process your request, verify syntax is correct')
      }
    }
  }

  if (event.node.req.method === 'DELETE') {
    if (!event.tokenDecoded) {
      return {
        message: 'Unauthorized',
        status: 401
      }
    } else {
      try {

        const { slug: _id } = query

        // Obtendo post
        const project = await Project.findById({ _id: new mongoose.Types.ObjectId(_id) })

        if (!project) return setResponseStatus(event, 400, 'Project not found')

        project.deleteOne()

        return { message: 'Project removed successfully!' }
      } catch (error) {
        return setResponseStatus(event, 400, 'Failed to process your request, verify syntax is correct')
      }
    }
  }
})
