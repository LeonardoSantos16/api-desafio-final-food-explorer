const knex = require("../database/knex")
const AppError = require("../utils/AppError");

class IngredientsController{
    async create(request, response){
        const {name, prate_id} = request.body;
        const user_id = request.user.id;

        try{
            const foodExists = await knex("prate_descriptions").where('id',prate_id)
            const userExists = await knex("users").where('id', user_id)

            if (!foodExists) {
                throw new AppError("Prato não encontrado", 404);
            }

            if (!userExists) {
                throw new AppError("Usuário não encontrado", 404);
            }

            await knex("food_ingredient").insert({
                name,
                user_id,
                prate_id
            })
            

            return response.status(201).json();
        } catch (error) {
            console.error(error);
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: 'Erro ao criar ingrediente' });
        }
    }

    async delete(request, response){
        const { id } = request.params

        try {
            const deleteCount = await knex("food_ingredient").where( { id }).delete();

            if(deleteCount === 0){
                throw new AppError("Ingrediente não encontrado", 404)
            }
            return response.status(204).json();
        } catch (error) {
            console.error(error);
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: 'Erro ao deletar ingrediente' });
        }
        
    }
}

module.exports = IngredientsController