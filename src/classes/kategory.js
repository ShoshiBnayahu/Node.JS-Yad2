const { KategoryModel } = require('../models/kategoryModel')

class Kategory {
  constructor (name) {
    this.kategory_id = 0
    this.kategory_name = name
    this.products = []
  }

  async setId () {
    const kategoriesList = await KategoryModel.find({})
    const kategoriesId = kategoriesList.map(p => parseInt(p.kategory_id))
    this.kategory_id = Math.max.apply(this, kategoriesId) + 1 | 0
  }

  async save () {
    const similarKategory = await KategoryModel.findOne({ kategory_name: this.kategory_name }).select({ _id: 0 }).exec()
    if (similarKategory != null) { return false }
    await this.setId()
    const kategory = new KategoryModel({
      kategory_id: parseInt(this.kategory_id),
      kategory_name: this.kategory_name,
      products: this.products
    })
    await kategory.save()
    return true
  }
}

module.exports = { Kategory }
