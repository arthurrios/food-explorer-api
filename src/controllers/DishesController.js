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

    res.json()
  }
}

module.exports = DishesController