const { hash } = require("bcryptjs")
const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body

    const userAlreadyExists = await knex("users").where("email", email).first()

    if (userAlreadyExists) {
      throw new AppError("This email is already in use.")
    }

    const hashedPassword = await hash(password, 8)

    await knex("users").insert({
      name,
      email,
      password: hashedPassword
    })

    return res.status(201).json({
      name,
      email,
      password
    })

  }


}

module.exports = UsersController