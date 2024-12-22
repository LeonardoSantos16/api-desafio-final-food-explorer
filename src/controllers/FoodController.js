const knex = require("../database/knex")
const AppError = require("../utils/AppError")
class FoodController{
    async create(request, response){
        const { title, description, price, food_icon, category, ingredients} = request.body
        const user_id = request.user.id;
        try{
            const [prate_id] = await knex("prate_descriptions").insert({
                title,
                description,
                user_id,
                price,
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
                ...foodDescription,
                foodIngredient
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
    
            food = await knex('prate_descriptions')
            .select(
                'prate_descriptions.id',
                'prate_descriptions.title',
                'prate_descriptions.description',
                'prate_descriptions.price',
                'prate_descriptions.food_icon',
                'prate_descriptions.category'
            )
                .join('food_ingredient', 'prate_descriptions.id', '=', 'food_ingredient.prate_id')
                .where('prate_descriptions.title', 'like', `%${query}%`) 
                .orWhere('food_ingredient.name', 'like', `%${query}%`)
                .groupBy('prate_descriptions.id', 'prate_descriptions.title', 'prate_descriptions.description', 'prate_descriptions.price', 'prate_descriptions.food_icon', 'prate_descriptions.category')
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

    async update(request, response){
        const { title, description, price, category, ingredients} = request.body
        const { id } = request.params
        const user_id = request.user.id;
        try{
            await knex("prate_descriptions").where({ id }).update({
                title,
                description,
                price,
                category,
            });

            if (ingredients) {
                await knex("food_ingredient").where({ prate_id: id }).del();

                const ingredientsInsert = ingredients.map(name => {
                    return {
                      prate_id: id,
                      name,
                      user_id
                    }
                  })

                await knex("food_ingredient")
                    .insert(ingredientsInsert);
            }
           
            return response.status(200).json();
        } catch (error) {
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({ error: error.message });
            }
            return response.status(500).json({error});
        }       
    }
}

module.exports = FoodController