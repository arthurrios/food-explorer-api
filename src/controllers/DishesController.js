const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class DishesController {
  async create(req, res) {
    const { name, image, price, category, description, ingredients } = req.body
    const { user_id } = req.params
 
    const { isAdmin } = await knex("users").where({ id: user_id }).first()

    if (!(!!isAdmin)) {
      throw new AppError("You must be an admin to create a dish.")
    }
    
    const [ dish_id ] = await knex("dishes").insert({
      name,
      image,
      price,
      category,
      description,
    })

    const ingredientsInsert = ingredients.map(name => {
      return {
        dish_id,
        name
      }
    })
    await knex("ingredients").insert(ingredientsInsert)

    return res.json()
  }

  async show(req, res) {
    const { id, user_id } = req.query

    const { isAdmin } = await knex("users").where({ id: user_id }).first()

    if (!(!!isAdmin)) {
      throw new AppError("You must be an admin to show a dish.")
    }

    const dish = await knex("dishes").where({ id }).first()
    const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name")

    return res.json({
      ...dish,
      ingredients
    })
  }

  async delete(req, res) {
    const { id, user_id } = req.query

    const { isAdmin } = await knex("users").where({ id: user_id }).first()

    if (!(!!isAdmin)) {
      throw new AppError("You must be an admin to delete a dish.")
    }

    await knex("dishes").where({ id }).delete()

    return res.json()
  }
}

module.exports = DishesController