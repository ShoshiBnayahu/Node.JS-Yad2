const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.loggedIn = function (req, res, next) {
  let token = req.header('Authorization')
  if (!token) return res.status(401).send('Access Denied')
  try {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft()
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (err) {
    console.log(err)
    res.status(400).send('Invalid Token')
  }
}

exports.adminOnly = function (req, res, next) {
  if (req.user?.type !== 'admin') {
    return res.status(401).send('Unauthorized!')
  }
  next()
}
