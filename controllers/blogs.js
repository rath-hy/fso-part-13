const router = require('express').Router()
const { Blog, User } = require('../models')
const tokenExtractor = require('../middleware/token_extractor')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    include: {
      model: User
    }
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res, next) => {
  console.log(req.body)
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id})
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

router.delete('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.findByPk(req.params.id) 

    if (blog && blog.userId === user.id) {
      await blog.destroy()
      res.status(204).end()
    }
  } catch (error) {
    next(error)
  }
})

//for testing error handler
router.get('/error', (req, res, next) => {
  const error = new Error('This is a test error!')
  next(error)
})

module.exports = router