const mongoose = require('mongoose')

const main = require('../services/dbService')
main().catch(err => console.log(err))

const Schema = mongoose.Schema

const userSchema = new Schema({
  id: Number,
  name: String,
  password: String,
  email: String,
  type: String
})

const UserModel = mongoose.model('users', userSchema)
module.exports = { UserModel }
