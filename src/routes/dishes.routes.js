const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const DishesController = require("../controllers/DishesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const dishesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const dishesController = new DishesController()

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.get("/:id/:user_id", dishesController.show)
dishesRoutes.get("/", dishesController.index)
dishesRoutes.post("/:user_id", upload.single("image"), dishesController.create)
dishesRoutes.put("/:id/:user_id", upload.single("image"), dishesController.update)
dishesRoutes.delete("/", dishesController.delete)

module.exports = dishesRoutes