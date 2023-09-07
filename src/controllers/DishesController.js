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
    const { id, user_id } = req.params

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

  async index(req, res) {
    const { name, ingredients } = req.query

    let dishes;

    if (ingredients) {
      const filteredIngredients = ingredients.split(",").map(ingredient => ingredient.trim())

      dishes = await knex("ingredients")
        .select([
          "dishes.id",
          "dishes.name"
        ])
        .whereLike("dishes.name", `%${name}%`)
        .whereIn("ingredients.name", filteredIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .groupBy("dishes.id")
        .orderBy("dishes.name")
    } else {
      dishes = await knex("dishes")
        .whereLike("dishes.name", `%${name}%`)
        .orderBy("dishes.name")
    }

    const allIngredients = await knex("ingredients")
    const dishesWithIngredients = dishes.map(dish => {
      const dishIngredients = allIngredients.filter(ingredient => ingredient.dish_id === dish.id)

      return {
        ... dish,
        ingredients: dishIngredients
      }
    })

    return res.json(dishesWithIngredients)
  }
}

module.exports = DishesController