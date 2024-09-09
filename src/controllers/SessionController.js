const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const authConfig  = require("../Configs/auth");

class SessionsController{
    async create(request, response){
        const { email, password} = request.body;
        const user = await knex("users").where({ email }).first();
        
        const passwordExists = await compare(password, user.password);
        
        if(!user || !passwordExists){
            throw new AppError("email ou senha incorreta", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })
        return response.json({ user, token });
    }
}
module.exports = SessionsController;