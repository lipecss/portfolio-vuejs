import { Schema, model } from "mongoose"

const skills = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
})

export const Skill = model('Skills', skills)
