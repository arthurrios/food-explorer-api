const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const DishesController = require("../controllers/DishesController")
const DishImageController = require('../controllers/DishImageController')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const dishesRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const dishesController = new DishesController()
const dishImageController = new DishImageController();


dishesRoutes.use(ensureAuthenticated)

dishesRoutes.get("/:id", dishesController.show)
dishesRoutes.get("/", dishesController.index)
dishesRoutes.post("/", verifyUserAuthorization("admin"), upload.single("image"), dishesController.create)
dishesRoutes.put("/:id", verifyUserAuthorization("admin"), upload.single("image"), dishesController.update)
dishesRoutes.delete("/:id", verifyUserAuthorization("admin"), dishesController.delete)
dishesRoutes.delete("/files/:filename", verifyUserAuthorization("admin"), dishImageController.delete);

module.exports = dishesRoutes