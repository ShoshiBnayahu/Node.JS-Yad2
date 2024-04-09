const { Kategory } = require('../classes/kategory')
const kategorySVC = require('../services/kategoryService')

const specificKategory = async (req, res, next) => {
  try {
    const kategoryName = req.params.kategoryName
    const kategoryResult = await kategorySVC.getKategoryByName(kategoryName)
    if (kategoryResult === undefined) {
      res.status(404)
      res.send('<html><h1> אין קטגוריה כזו </h1></html>')
    }
    res.json(kategoryResult)
  } catch (err) {
    next(err)
  }
}

const allKategories = async (req, res, next) => {
  try {
    const kategories = await kategorySVC.getAllKategories()
    res.json(kategories.toSorted((a, b) => a.kategory_name.localeCompare(b.kategory_name)))
  } catch (error) {
    next(error)
  }
}

const addKategory = async (req, res, next) => {
  try {
    const kategoryName = req.body.kategoryName
    const newKategory = new Kategory(kategoryName)
    if (await newKategory.save()) { res.send(`kategory added! for add product to this Kategory,please do its with put http://localhost:3000/Yad2/products/${kategoryName}`) }
    res.status(404)
    res.send('<html><h1>  ניתן לעדכן עי put כבר קיימת קטגוריה כזו </h1></html>')
  } catch (err) {
    next(err)
  }
}

const deleteKategory = async (req, res, next) => {
  try {
    const kategoryName = req.params.kategoryName
    if (await kategorySVC.deleteKategory(kategoryName)) { res.send('kategory deleted!') }
    res.status(404).send('<html><h1>   לא קיימת קטגוריה כזו </h1></html>')
  } catch (err) {
    next(err)
  }
}

const updateKategory = async (req, res, next) => {
  try {
    const kategoryName = req.params.kategoryName
    await kategorySVC.updateKategory(kategoryName, req.body.kategoryName ? req.body.kategoryName : kategoryName,
      req.body.products ? req.body.products : await kategorySVC.getKategoryByName(kategoryName).products)
    res.send('kategory updated!')
  } catch (err) {
    next(err)
  }
}

module.exports = { allKategories, specificKategory, addKategory, deleteKategory, updateKategory }
