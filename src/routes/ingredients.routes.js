const { Router } = require("express")
const IngredientsController = require("../controllers/IngredientsController")
const ingredientsController = new IngredientsController();
const ingredientsRoutes = Router();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

ingredientsRoutes.use(ensureAuthenticated);

ingredientsRoutes.post("/", ingredientsController.create);
ingredientsRoutes.delete("/:id", ingredientsController.delete);

module.exports = ingredientsRoutes