const mongoose = require('mongoose')
const main = require('../services/dbService')
main().catch(err => console.log(err))

const Schema = mongoose.Schema

const kategorySchema = new Schema({
  kategory_id: Number,
  kategory_name: String,
  products: [{
    id: Number,
    name: String,
    price: Number
  }]
})
const KategoryModel = mongoose.model('kategories', kategorySchema)
module.exports = { KategoryModel }
