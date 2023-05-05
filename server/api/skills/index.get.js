import { Skill } from '../../models/Skill'

export default defineEventHandler(async (event) => {
  try {
    const skills = await Skill.find({})

    if (!skills) return { message: 'Filed to get Skill' }

    return skills
  } catch (error) {
    return setResponseStatus(event, 400, 'Failed to process your request, verify syntax is correct')
  }
})
