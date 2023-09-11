const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class OrdersController {
  async make(req, res) {
    const { orderItems } = req.body
    const { user_id } = req.params
    const itemsInsert = []

    const [ orderId ] = await knex("orders").insert({
      user_id,
      status: "Pending"
    })

    for (const item of orderItems) {
      const { dish_id, quantity } = item
      const dish = await knex("dishes").where({ id: dish_id }).first()

      const subtotal = quantity * dish.price

      itemsInsert.push({
        order_id: orderId,
        dish_id,
        name: dish.name,
        quantity,
        subtotal
      })             
    }
    await knex("orderItems").insert(itemsInsert)
    
    const subtotals = itemsInsert.map(item => item.subtotal)
    const orderTotal = subtotals.reduce((total, subtotal) => total + subtotal, 0)

    await knex("orders").where({ id: orderId })
      .update({ order_total: orderTotal })
      
    return res.json()
  }

  async updateStatus(req, res) {
    const { status, orderId } = req.query
    const { user_id } = req.params

    const { isAdmin } = await knex("users").where({ id: user_id }).first()

    if (!(!!isAdmin)) {
      throw new AppError("You must be an admin to update an order status.")
    }

    await knex("orders").where({ id: orderId }).update({
      status: status
    })

    return res.json()
  }

  async showUserOrders(req, res) {
    const { user_id } = req.params

    const orders = await knex("orders").where({ user_id })

    const ordersItems = await knex("orderItems")
    const orderWithItems = orders.map(order => {
      const orderItems = ordersItems.filter(item => item.order_id === order.id)

      return {
        ...order,
        items: orderItems
      }
    })


    return res.json(orderWithItems)
  }

  async index(req, res) {
    const { user_id } = req.params

    const { isAdmin } = await knex("users").where({ id: user_id }).first()

    if (!(!!isAdmin)) {
      throw new AppError("You must be an admin to index all orders.")
    }

    const orders = await knex("orders")

    const ordersItems = await knex("orderItems")
    const orderWithItems = orders.map(order => {
      const orderItems = ordersItems.filter(item => item.order_id === order.id)

      return {
        ...order,
        items: orderItems
      }
    })


    return res.json(orderWithItems)
  }
}

module.exports = OrdersController