const { Router } = require("express")

const OrdersController = require("../controllers/OrdersController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const ordersRoutes = Router()

const ordersController = new OrdersController()

ordersRoutes.use(ensureAuthenticated)

ordersRoutes.post("/:user_id", ordersController.make)
ordersRoutes.patch("/", verifyUserAuthorization("admin"), ordersController.updateStatus)
ordersRoutes.get("/", verifyUserAuthorization("admin"), ordersController.index)
ordersRoutes.get("/:user_id", ordersController.showUserOrders)

module.exports = ordersRoutes