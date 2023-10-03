const AppError = require("../utils/AppError");
const knex = require("../database/knex")

class PaymentController {
  async index(req, res) {
    const { dishIds } = req.query
      try {
        if (dishIds.length > 0) {
          const arrayDishIds = dishIds.split(",")
          
          const filteredDishes = 
            await knex("dishes")
                  .select("id", "image", "name", "price")
                  .whereIn("id", arrayDishIds)

          return res.status(200).json(filteredDishes)
        } else {
          return { Message: "No dish added to order."}
        }
      } catch {
        throw new AppError("Not possible to load order", 500)
      }
    
  }
}

module.exports = PaymentController;