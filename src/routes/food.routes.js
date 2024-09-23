const { Router } = require("express");
const FoodController = require("../controllers/FoodController");
const foodRoutes = Router();
const foodController = new FoodController();
const FoodIconController = require("../controllers/FoodIconController")
const foodIconController = new FoodIconController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const multer = require("multer");
const uploadConfig = require("../configs/upload")
foodRoutes.use(ensureAuthenticated);

const upload = multer(uploadConfig.MULTER)

foodRoutes.post("/", foodController.create);
foodRoutes.get("/:id", foodController.show);
foodRoutes.get("/", foodController.index);
foodRoutes.delete("/:id", foodController.delete);
foodRoutes.patch("/:id", foodController.update);
foodRoutes.put("/icon/:id", ensureAuthenticated, upload.single("food_icon"), foodIconController.update)
foodRoutes.post("/icon", ensureAuthenticated, upload.single("food_icon"), foodIconController.create)
module.exports = foodRoutes;