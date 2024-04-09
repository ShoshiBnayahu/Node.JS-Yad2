const { KategoryModel } = require('../models/kategoryModel')
class Product {
  constructor (name, price) {
    this.id = 0
    this.name = name
    this.price = price
  }

  async setId (kategoryName) {
    const kategory = await KategoryModel.findOne({ kategory_name: kategoryName }).select({ _id: 0, products: 1 }).exec()
    const productsId = kategory.products.map(p => parseInt(p.id))
    this.id = Math.max.apply(this, productsId) + 1 | 0
  }

  async save (kategoryName) {
    await this.setId(kategoryName)
    const kategory = await KategoryModel.findOne({ kategory_name: kategoryName }).select({ _id: 0, products: 1 }).exec()
    kategory.products.push(this)
    await KategoryModel.updateOne({ kategory_name: kategoryName }, { products: kategory.products })
  }
}

module.exports = { Product }
