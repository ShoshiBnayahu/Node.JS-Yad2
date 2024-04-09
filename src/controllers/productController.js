const { Product } = require('../classes/product')
const productSVC = require('../services/productService')
const specificProductFromSpecificKategory = async (req, res, next) => {
  try {
    const kategoryName = req.params.kategoryName
    const productName = req.params.productName
    const productResult = await productSVC.getProduct(kategoryName, productName)
    if (productResult === undefined) {
      res.status(404)
      res.send('<html><h1> לא קיים</h1></html>')
    }
    res.json(productResult)
  } catch (err) {
    next(err)
  }
}

const allProductFromSpecificKategory = async (req, res, next) => {
  try {
    const kategoryName = req.params.kategoryName
    const products = await productSVC.getAllProducts(kategoryName)
    if (products === undefined) {
      res.status(404)
      res.send('<html><h1> אין קטגוריה כזו </h1></html>')
    } else { res.json(products.toSorted((a, b) => a.name.localeCompare(b.name))) }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

const addProduct = async (req, res, next) => {
  try {
    const kategoryName = req.params.kategoryName
    const newProduct = new Product(req.body.productName, req.body.price)
    await newProduct.save(kategoryName)
    res.send('product added!')
  } catch (err) {
    next(err)
  }
}

const deleteProductById = async (req, res, next) => {
  try {
    const kategoryName = req.params.kategoryName
    const productId = req.params.productId
    await productSVC.deleteProduct(kategoryName, productId)
    res.send('product deleted! ')
  } catch (err) {
    next(err)
  }
}

const updateProductById = async (req, res, next) => {
  try {
    const kategoryName = req.params.kategoryName
    const productId = req.params.productId
    await productSVC.updateProductById(kategoryName, productId, req.body.productName, req.body.price)
    res.send('product updated!')
  } catch (err) {
    next(err)
  }
}

module.exports = {
  specificProductFromSpecificKategory,
  allProductFromSpecificKategory,
  addProduct,
  deleteProductById,
  updateProductById
}
