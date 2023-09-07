const { Router } = require("express")

const DishesController = require("../controllers/DishesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const dishesRoutes = Router()

const dishesController = new DishesController()

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post("/:user_id", dishesController.create)
dishesRoutes.get("/", dishesController.show)

module.exports = dishesRoutes