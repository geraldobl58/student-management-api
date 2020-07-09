import User from '../models/User';

class UserController {
  async store(request, response) {
    try {
      const newUser = await User.create(request.body);
      const { id, firstname, email } = newUser;
      return response.json({ id, firstname, email });
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(request, response) {
    try {
      const users = await User.findAll({ attributes: ['id', 'firstname', 'email'] });
      return response.json(users);
    } catch (e) {
      return response.json(null);
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      const user = await User.findByPk(id);

      const { firstname, email } = user;

      return response.json({ id, firstname, email });
    } catch (e) {
      return response.json(null);
    }
  }

  async update(request, response) {
    try {
      const user = await User.findByPk(request.userId);

      if (!user) {
        return response.status(400).json({
          errors: ['Whoops: usuário não encontrado!'],
        });
      }

      const data = await user.update(request.body);
      const { id, firstname, email } = data;

      return response.json({ id, firstname, email });
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(request, response) {
    try {
      const user = await User.findByPk(request.userId);

      if (!user) {
        return response.status(400).json({
          errors: ['Whoops: usuário não encontrado!'],
        });
      }

      await user.destroy();

      return response.json(user);
    } catch (e) {
      return response.json(null);
    }
  }
}

export default new UserController();
