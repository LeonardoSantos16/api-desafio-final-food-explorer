const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const authConfig  = require("../configs/auth");

class SessionsController{
    async create(request, response){
        const { email, password} = request.body;
        const user = await knex("users").where({ email }).first();
        
        const passwordExists = await compare(password, user.password);
        
        if(!user || !passwordExists){
            throw new AppError("email ou senha incorreta", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({ role: user.role }, secret, {
            subject: String(user.id),
            expiresIn
        });

        response.cookie("token", token, {
            httpOnly: true,
            sameSite: "Strict",
            secure: false,
            maxAge: 15 * 600 * 1000
          })
        delete user.password
        return response.json({ user });
    }
}
module.exports = SessionsController;