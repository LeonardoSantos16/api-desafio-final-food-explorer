const { Router } = require("express");
const FoodController = require("../controllers/FoodController");
const foodRoutes = Router();
const foodController = new FoodController();
const FoodIconController = require("../controllers/FoodIconController")
const foodIconController = new FoodIconController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const multer = require("multer");
const uploadConfig = require("../configs/upload")
const userAuthorization = require("../middlewares/userAuthorization")
foodRoutes.use(ensureAuthenticated)
const upload = multer(uploadConfig.MULTER)

foodRoutes.post("/", userAuthorization("admin"), foodController.create);
foodRoutes.get("/:id", foodController.show);
foodRoutes.get("/", foodController.index);
foodRoutes.delete("/:id", userAuthorization("admin"), foodController.delete);
foodRoutes.patch("/:id", userAuthorization("admin"), foodController.update);
foodRoutes.put("/icon/:id", userAuthorization("admin"), upload.single("food_icon"), foodIconController.update)
foodRoutes.post("/icon", userAuthorization("admin"), upload.single("food_icon"), foodIconController.create)
module.exports = foodRoutes;