import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import slugify from 'slugify'

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: 'https://images.unsplash.com/photo-1593720216276-0caa6452e004?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1424&q=80'
  },
  likes: {
    type: Number,
    default: 0,
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

postSchema.plugin(paginate)

postSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }

  next()
})

export const Post = model('Post', postSchema)