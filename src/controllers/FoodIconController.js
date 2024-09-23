const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class FoodIconControllers {

    async create(request, response){
     
        const foodIconFilename = request.file.filename;
    
        const diskStorage = new DiskStorage();
        const filename = await diskStorage.saveFile(foodIconFilename); 
        
        const food_icon = filename;

        return response.json(food_icon);
    }
    async update(request, response) {
        const { id } = request.params
        const foodIconFilename = request.file.filename;
        const [ food ]  = await knex("prate_descriptions").where({ id })
        const diskStorage = new DiskStorage();

        if (food.food_icon) {
            await diskStorage.deleteFile(food.food_icon);
        }
        const filename = await diskStorage.saveFile(foodIconFilename); 
        const food_icon = filename;
        food.food_icon = food_icon
        await knex("prate_descriptions").update(food).where({ id });
        return response.json(food_icon);
    }
}
module.exports = FoodIconControllers;