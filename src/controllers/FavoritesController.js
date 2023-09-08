const knex = require("../database/knex")

class FavoritesController {
  async select(req, res) {
    const { dish_id, user_id } = req.params

    const { name } = await knex("dishes").where({ id: dish_id }).first()

    await knex("favorites").insert({
      dish_id,
      user_id,
      name
    })

    return res.json()
    
  }
  async deselect(req, res) {
    const { id } = req.params

    await knex("favorites").where({ id }).delete()

    return res.json()
  }
}

module.exports = FavoritesController