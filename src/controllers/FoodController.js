const knex = require("../database/knex")
const AppError = require("../utils/AppError")
class FoodController{
    async create(request, response){
        const { title, description, preco, food_icon, category, ingredients} = request.body
        const user_id = request.user.id;
        try{
            const [prate_id] = await knex("prate_descriptions").insert({
                title,
                description,
                user_id,
                preco,
                food_icon,
                category
            })
    
            const ingredientsInsert = ingredients.map(name => {
                return {
                    prate_id,
                    user_id,
                    name
                }
            })
            await knex("food_ingredient").insert(ingredientsInsert)
    
            return response.status(201).json({ prate_id });
        } catch (error) {
            console.error(error);
            throw new AppError('Erro ao criar prato', 500);
        }
    }

    async show(request, response){
        const { id } = request.params;

        try{
            const foodDescription = await knex("prate_descriptions").where({ id }).first();
            const foodIngredient = await knex("food_ingredient").where({prate_id: id}).orderBy("name");
            if(!foodDescription){
                throw new AppError("Prato não encontrado", 404)
            }
            return response.json({
                ...foodIngredient,
                foodDescription
            });
        } catch (error){
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: 'Erro ao buscar prato' });
        }
        
    }

    async index(request, response){
        const { query } = request.query;
        let food;
    
        try{
            if (query) {
                // Executando a consulta com junção entre as tabelas
                food = await knex('prate_descriptions')
                    .leftJoin('food_ingredient', 'prate_descriptions.id', 'food_ingredient.prate_id')
                    .where(function() {
                        // Adicionando a condição de busca para título ou nome do ingrediente
                        this.where('prate_descriptions.title', 'like', `%${query}%`)
                            .orWhere('food_ingredient.name', 'like', `%${query}%`);
                    })
                    .orderBy('prate_descriptions.title');
            } else{
                food = await knex("prate_descriptions")
            }
    
            return response.json(food)
        } catch (error) {
            console.error(error);
            throw new AppError('Erro ao listar pratos', 500);
        }
        
    }

    async delete(request, response){
        const { id } = request.params
        try{
            const deleteCount = await knex("prate_descriptions").where({ id }).delete();
            if(deleteCount === 0){
                throw new AppError("Prato não encontrado", 404);
            }
            return response.status(204).json();
        } catch (error) {
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({ error: 'Erro ao deletar prato' });
        }
        
    }
}

module.exports = FoodController