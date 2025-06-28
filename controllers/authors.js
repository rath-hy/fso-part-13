const router = require('express').Router()
const { sequelize } = require('../util/db')

const { User, Blog } = require('../models')

//primitive solution
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

//more advanced solution
router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: []
    },

    attributes: [ [sequelize.col('user.name'), 'name'], [sequelize.fn('SUM', sequelize.col('likes')), 'total_likes'] ],
    group: 'user.name'
  })
  res.json(blogs)
})

module.exports = router