const errorHandler = (err, req, res, next) => {
  console.log(`error ${err.message} ${err.statusCode}`)
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.message = 'יש כרגע שגיאה בשרת נסה שוב מאוחר יותר'
  res.send(res.message)
}
const checkBody = (req, res, next) => {
  if ((req.method === 'POST' || req.method === 'PUT') && (Object.keys(req.body).length === 0)) {
    res.status(404)
    res.send('חסר body')
  }
  next()
}

module.exports = { errorHandler, checkBody }
