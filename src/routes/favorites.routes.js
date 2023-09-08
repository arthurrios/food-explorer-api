const { Router } = require("express")

const FavoritesController = require("../controllers/FavoritesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const favoritesRoutes = Router()

const favoritesController = new FavoritesController()

favoritesRoutes.use(ensureAuthenticated)

favoritesRoutes.post("/:dish_id/:user_id", favoritesController.select)
favoritesRoutes.delete("/:id", favoritesController.deselect)

module.exports = favoritesRoutes