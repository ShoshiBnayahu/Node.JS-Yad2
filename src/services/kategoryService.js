const { KategoryModel } = require('../models/kategoryModel')

const getKategoryByName = async (name) => {
  const kategory = await KategoryModel.findOne({ kategory_name: name }).select({ _id: 0 }).exec()
  return kategory
}
const getAllKategories = async (name) => {
  const kategories = await KategoryModel.find({}).select({ _id: 0 }).exec()
  return kategories
}
const deleteKategory = async (name) => {
  const kategory = await KategoryModel.findOne({ kategory_name: name }).select({}).exec()
  if (kategory == null) { return false }
  await kategory.deleteOne()
  return true
}
const updateKategory = async (name, newName, newProducts) => {
  console.log(name, newName, newProducts)
  await KategoryModel.updateOne({ kategory_name: name }, { kategory_name: newName, products: newProducts }).select({}).exec()
}

module.exports = {
  getKategoryByName,
  getAllKategories,
  deleteKategory,
  updateKategory
}
