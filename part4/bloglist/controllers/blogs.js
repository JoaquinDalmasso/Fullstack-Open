const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  try{    
       if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
     } catch(exception) {
      next(exception)
     }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!body.likes) {
      body.likes = 0
  }
  if (!body.comments) {
    body.comments = []
}
  const blogToUpdate = await Blog.findById(request.params.id)

  if ( blogToUpdate.user._id.toString() == user._id.toString() ) {
      blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        comments:body.comments
    }

  try{    
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
}else{
  return response.status(401).json({ error: `Unauthorized` })
}
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  
  if (!body.likes) {
    body.likes = 0
}
if (!body.comments) {
  body.comments = []
}
const blog = new Blog({
  title: body.title,
  author: body.author,
  url: body.url,
  likes: body.likes,
  comments:body.comments,
  user: user.id
})
try {
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
} catch(exception) {
  next(exception)
}
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  const blogToDelete = await Blog.findById(request.params.id)

  if ( blogToDelete.user._id.toString() === user._id.toString() ) {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
      } catch (exception) {
        next(exception)
      }
} else {
    return response.status(401).json({ error: `Unauthorized` })
}
})

module.exports = blogsRouter