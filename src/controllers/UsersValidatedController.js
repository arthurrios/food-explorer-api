const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UsersValidatedController {
  async index(req, res) {
    const { user } = req

    const checkIfUserExists = await knex("users").where({ id: user.id })

    if (checkIfUserExists.length === 0) {
      throw new AppError("Unauthorized", 401)
    }

    return res.status(200).json()
  }
}

module.exports = UsersValidatedController;