import Pusher from 'pusher'
import mongoose from 'mongoose'
import { Post } from '../../../models/Post'

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER
})

export default defineEventHandler(async (event) => {
  try {
    const { id } = getRouterParams(event)
    const { action } = await readBody(event)

    const counter = action === 'like' ? 1 : -1
    const status = action

    await Post.findByIdAndUpdate(new mongoose.Types.ObjectId(id), { $inc: { likes: counter } })

    const post = await Post.findById(new mongoose.Types.ObjectId(id))

    if (post) {
      // pusher.trigger('portfolio-likes', 'postAction', {
      //   id: post.id,
      //   likes: post.likes,
      //   status
      // })

      return { posts: post.likes }
    }
  } catch (error) {
    return { message: 'Failed to process your request, verify syntax is correct' }
  }
})
