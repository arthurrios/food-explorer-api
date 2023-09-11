const { Router } = require("express")

const OrdersController = require("../controllers/OrdersController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const ordersRoutes = Router()

const ordersController = new OrdersController()

ordersRoutes.use(ensureAuthenticated)

ordersRoutes.post("/:user_id", ordersController.make)
ordersRoutes.patch("/:user_id", ordersController.updateStatus)
ordersRoutes.get("/:user_id", ordersController.index)
ordersRoutes.get("/:user_id", ordersController.showUserOrders)

module.exports = ordersRoutes