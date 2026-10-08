import { Schema, model } from "mongoose"
import paginate from 'mongoose-paginate-v2'
import slugify from 'slugify'

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [Object],
  },
  skills: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Skills', select: false }],
    select: false,
  },
  url: {
    type: String
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
})

projectSchema.plugin(paginate)

projectSchema.pre('validate', function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true })
  }

  next()
})

export const Project = model('Project', projectSchema)
