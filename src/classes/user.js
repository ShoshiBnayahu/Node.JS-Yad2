const { UserModel } = require('../models/userModels')
class User {
  constructor (name, password, email, type) {
    // eslint-disable-next-line no-unused-expressions, no-sequences
    this.id = 0,
    this.name = name,
    this.password = password,
    this.email = email,
    this.type = type
  }

  async setId () {
    const usersList = await UserModel.find({})
    const usersId = usersList.map(u => parseInt(u.id))
    this.id = Math.max.apply(this, usersId) + 1 | 0
  }

  async save () {
    await this.setId()
    const user = new UserModel({
      id: parseInt(this.id),
      name: this.name,
      password: this.password,
      email: this.email,
      type: this.type
    })
    await user.save()
  }
}
module.exports = { User }
