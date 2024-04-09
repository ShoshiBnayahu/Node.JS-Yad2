const express = require('express')
const router = express.Router()
const KategoriesController = require('../controllers/kategoryController')
const { adminOnly } = require('../middlewares/authMiddlewares')
const ErrorHandler = require('../middlewares/errorHandlers')
/// /check only admin
router.get('/', adminOnly, KategoriesController.allKategories)
router.get('/:kategoryName', KategoriesController.specificKategory)
router.post('/', KategoriesController.addKategory)
router.delete('/:kategoryName', KategoriesController.deleteKategory)
router.put('/:kategoryName', KategoriesController.updateKategory)
router.use(ErrorHandler.errorHandler)

module.exports = router
