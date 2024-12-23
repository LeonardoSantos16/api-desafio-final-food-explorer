const { verify } = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');

function ensureAuthenticated(request, response, next) {
  const token = request.cookies?.token; 

  if (!token) {
    throw new AppError("JWT token não informado", 401);
  }

  try {
    const { role, sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
      role
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT token", 401);
  }
}


module.exports = ensureAuthenticated;