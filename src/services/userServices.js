const { UserModel } = require('../models/userModels')

const getUsersByName = async (name) => {
  const users = await UserModel.find({ name }).select({ _id: 0 }).exec()
  return users
}
const getAllUser = async (name) => {
  const users = await UserModel.find({}).select({ _id: 0 }).exec()
  return users
}
module.exports = {
  getUsersByName,
  getAllUser
}
