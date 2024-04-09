const { KategoryModel } = require('../models/kategoryModel')

const getAllProducts = async (kategoryName) => {
  return (await KategoryModel.findOne({ kategory_name: kategoryName }).select({ _id: 0, products: 1 }).exec()).products
}

const getProduct = async (kategoryName, ProductName) => {
  return await getAllProducts(kategoryName).then(res => res.filter(p => p.name === ProductName))
}

const deleteProduct = async (kategoryName, ProductId) => {
  const kategory = await KategoryModel.findOne({ kategory_name: kategoryName }).select({ _id: 0, products: 1 }).exec()
  kategory.products = kategory.products.filter(p => p.id !== parseInt(ProductId))
  await KategoryModel.updateOne({ kategory_name: kategoryName }, { products: kategory.products })
}
const updateProductById = async (kategoryName, ProductId, newName, newPrice) => {
  const kategory = await KategoryModel.findOne({ kategory_name: kategoryName }).select({ _id: 0, products: 1 }).exec()
  const product = kategory.products.find(p => p.id === parseInt(ProductId))
  console.log(product)
  product.name = newName || product.name
  product.price = newPrice || product.price
  await KategoryModel.updateOne({ kategory_name: kategoryName }, { products: kategory.products })
}

module.exports = {
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProductById
}
