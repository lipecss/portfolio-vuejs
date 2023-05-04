import mongoose from 'mongoose'
import { Post } from '../../models/Post'

export default defineEventHandler(async (event) => {
  const query = getRouterParams(event)

  if (event.node.req.method === 'GET') {
    try {
      const { slug } = query

      const post = await Post.findOne({ slug })

      if (!post) {
        throw new Error('Post not found or not Exist')
      }

      else return post

    } catch (error) {
      throw new Error('Failed to process your request, verify syntax is correct')
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

        const { title: newTitle, content: newContent, img: newImg } = await readBody(event)

        // Obtendo post
        const post = await Post.findById({ _id: new mongoose.Types.ObjectId(_id) })
        if (!post) return setResponseStatus(event, 404, 'Post not found')

        post.img = newImg === post.img || newImg === '' ? post.img : newImg
        post.title = newImg === post.title ? post.title : newTitle
        post.content = newImg === post.content ? post.content : newContent

        const updated = await post.save()

        return { post: updated }
      } catch (error) {
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
        const post = await Post.findById({ _id: new mongoose.Types.ObjectId(_id) })

        if (!post) return setResponseStatus(event, 400, 'Post not found')

        post.deleteOne()

        return { message: 'POST removed successfully!' }
      } catch (error) {
        return setResponseStatus(event, 400, 'Failed to process your request, verify syntax is correct')
      }
    }
  }
})

