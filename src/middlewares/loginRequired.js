import jwt from 'jsonwebtoken';

import User from '../models/User';

export default async (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      errors: ['Você precisa de autorização para acessar!'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return response.status(401).json({
        errors: ['Whopps: usuário inválido!'],
      });
    }

    request.userId = id;
    request.userEmail = email;
    return next();
  } catch (e) {
    return response.status(401).json({
      errors: ['Whopps: Token inválido ou expirado!'],
    });
  }
};
