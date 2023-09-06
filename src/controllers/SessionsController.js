const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { compare } = require("bcryptjs")
const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body

    const user = await knex("users").where({ email: email }).first()

    if (!user) {
      throw new AppError("Wrong email or password.", 401)
    }

    const matchedPassword = await compare(password, user.password)

    if (!matchedPassword) {
      throw new AppError("Wrong email or password.", 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return res.json({ user, token })
  }
}

module.exports = SessionsController