import { Post } from '../../models/Post'

export default defineEventHandler(async (event) => {
  if (!event.tokenDecoded) {
    return {
      message: 'Unauthorized',
      status: 401
    }
  } else {
    try {
      const { img, title, content } = await readBody(event)

      console.log('title', title)

      const image = img ? img : 'https://images.unsplash.com/photo-1593720216276-0caa6452e004?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1424&q=80'
      const newPost = new Post({
        img: image,
        title,
        content
      })

      const postData = await newPost.save()

      return { postData }

    } catch (error) {
      return setResponseStatus(event, 400, 'Failed to process your request, verify syntax is correct')
    }
  }
})
