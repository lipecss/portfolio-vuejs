import { Skill } from '../../models/Skill'

// Versão leve de /api/skills (sem o SVG de cada skill), usada pela home.
export default defineEventHandler(async () => {
  try {
    return await Skill.find().select('name').sort({ created_at: 1 }).lean()
  } catch (error) {
    return []
  }
})
