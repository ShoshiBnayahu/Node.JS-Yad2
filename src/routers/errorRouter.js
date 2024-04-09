const express = require('express')
const router = express.Router()
const ErrorController = require('../controllers/errorController.js')
const ErrorHandler = require('../middlewares/errorHandlers.js')
router.get('/', ErrorController)
router.use(ErrorHandler.errorHandler)
module.exports = router
