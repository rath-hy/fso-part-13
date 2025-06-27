const router = require('express').Router()

const { User } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  }) //somehow find user with this username
  if (user) {
    user.username = req.body.username //new username has to be passed in via req body
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
