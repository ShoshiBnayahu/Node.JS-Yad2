const Logger = (req, res, next) => {
  console.log(`time: ${Date.now()}  \n ${req.method}   req.url: ${req.url}`)
  next()
}
module.exports = Logger
