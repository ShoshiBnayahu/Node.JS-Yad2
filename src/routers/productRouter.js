const express = require('express')
const router = express.Router()
const ProductsController = require('../controllers/productController')
const ErrorHandler = require('../middlewares/errorHandlers')

router.get('/:kategoryName', ProductsController.allProductFromSpecificKategory)
router.get('/:kategoryName/:productName', ProductsController.specificProductFromSpecificKategory)
router.post('/:kategoryName', ProductsController.addProduct)
router.delete('/:kategoryName/:productId', ProductsController.deleteProductById)
router.put('/:kategoryName/:productId', ProductsController.updateProductById)
router.use(ErrorHandler.errorHandler)

module.exports = router
