import { Skill } from '../../models/Skill'

export default defineEventHandler(async (event) => {
  if (!event.tokenDecoded) {
    return {
      message: 'Unauthorized',
      status: 401
    }
  } else {
    try {
      const { name, image } = await readBody(event)

      const skill = await Skill.findOne({ name })

      if (skill) return setResponseStatus(event, 400, 'Failed to add a new Skill')

      const newSkill = new Skill({ name, image }).save()

      return newSkill
    } catch (error) {
      return setResponseStatus(event, 400, 'Failed to process your request, verify syntax is correct')
    }
  }
})
