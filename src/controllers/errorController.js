module.exports = (req, res) => {
  res.status(404).send()
  res.message = 'יש לך טעות בכתובת'
  res.send(res.message)
}
