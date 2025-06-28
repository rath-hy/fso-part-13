const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog
    }
  })

  const authorInformation = users.map(user => ({
    name: user.name,
    articles: user.blogs.length,
    likes: user.blogs.reduce((sum, blog) => (sum + blog.likes), 0)
  })
  )

  res.json(authorInformation)
})

module.exports = router