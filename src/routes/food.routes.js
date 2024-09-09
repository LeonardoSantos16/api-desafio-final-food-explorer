const { Router } = require("express");
const FoodController = require("../controllers/FoodController");
const foodRoutes = Router();
const foodController = new FoodController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
foodRoutes.use(ensureAuthenticated);

foodRoutes.post("/", foodController.create);
foodRoutes.get("/:id", foodController.show);
foodRoutes.get("/", foodController.index);
foodRoutes.delete("/:id", foodController.delete);

module.exports = foodRoutes;