const router = require('express').Router()
const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res, next) => {
  console.log(req.body)
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch(error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      blog.likes = parseInt(req.body.likes)
      await blog.save()
      res.json(blog)
    } else {
      const error = new Error('Blog not found')
      error.status = 404
      next(error)
    }
  } catch(error) {
      next(error)
  }
})

router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id) 
  if (blog) {
    await note.destroy()
  }
  res.status(204).end()
})

//for testing error handler
router.get('/error', (req, res, next) => {
  const error = new Error('This is a test error!')
  next(error)
})

module.exports = router