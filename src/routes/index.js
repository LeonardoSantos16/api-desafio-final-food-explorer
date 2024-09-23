const {Router} = require("express");
const routes = Router();

const FoodIconControllers = require("../controllers/FoodIconController");
const FoodIconController = new FoodIconControllers();
const userRouter = require("./users.routes");
const sessionRoutes = require("./session.routes");
const foodRoutes = require("./food.routes");
const ingredientsRoutes = require("./ingredients.routes");

routes.use("/users", userRouter);
routes.use("/sessions", sessionRoutes)
routes.use("/food", foodRoutes);
routes.use("/ingredients", ingredientsRoutes)
module.exports = routes;

