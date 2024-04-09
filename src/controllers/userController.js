const { User } = require('../classes/user')
const userSVC = require('../services/userServices')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signUp = async (req, res, next) => {
  try {
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hasPassword = await bcrypt.hash(req.body.password, salt)

    // Create an user object
    const user = new User(
      req.body.name,
      req.body.email,
      hasPassword,
      req.body.type
    )
    // Save User in the database

    delete user.password
    await user.save()
    console.log(await userSVC.getAllUser())
    res.send(' user saved')
  } catch (err) {
    console.log(err)
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    // Check user exist
    const users = await userSVC.getUsersByName(req.body.name)
    if (users) {
      const user = await users.find(u => bcrypt.compare(req.body.password, '' + u.password))
      if (!user) return res.status(400).send('Name or Password is wrong')
      // Create and assign token
      const token = jwt.sign({ id: user.id, type: user.type }, process.env.JWT_SECRET)
      res.header('auth-token', token).send({ token })
      // res.send("Logged IN");
    } else {
      return res.status(400).send('Name or Password is wrong')
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = {
  signUp,
  login
}
