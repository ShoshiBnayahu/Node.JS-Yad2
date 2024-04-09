const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/userController')
const ErrorHandler = require('../middlewares/errorHandlers')

router.post('/signUp', UsersController.signUp)
router.post('/login', UsersController.login)

router.use(ErrorHandler.errorHandler)

module.exports = router
