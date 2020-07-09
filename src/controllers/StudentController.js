import Student from '../models/Student';

import File from '../models/File';

class StudentController {
  async index(request, response) {
    const students = await Student.findAll({
      attributes: [
        'id', 'firstname', 'lastname', 'email', 'age', 'weight', 'height',
      ],
      order: [['id', 'DESC'], [File, 'id', 'DESC']],
      include: {
        model: File,
        attributes: ['url', 'filename'],
      },
    });
    return response.json(students);
  }

  async store(request, response) {
    try {
      const student = await Student.create(request.body);

      return response.status(201).json(student);
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          errors: ['Whoops: Id não encontrado!'],
        });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return response.status(400).json({
          errors: ['Whoops: Aluno não encontrado!'],
        });
      }

      const newStudent = await student.update(request.body);

      return response.json(newStudent);
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          errors: ['Whoops: Id não encontrado!'],
        });
      }

      const student = await Student.findByPk(id, {
        attributes: [
          'id', 'firstname', 'lastname', 'email', 'age', 'weight', 'height',
        ],
        order: [['id', 'DESC'], [File, 'id', 'DESC']],
        include: {
          model: File,
          attributes: ['url', 'filename'],
        },
      });

      if (!student) {
        return response.status(400).json({
          errors: ['Whoops: Aluno não encontrado!'],
        });
      }

      return response.json(student);
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          errors: ['Whoops: Id não encontrado!'],
        });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return response.status(400).json({
          errors: ['Whoops: Aluno não encontrado!'],
        });
      }

      await student.destroy();

      return response.json({ remove: true });
    } catch (e) {
      return response.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new StudentController();
