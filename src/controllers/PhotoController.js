import multer from 'multer';

import upload from '../config/upload';

import File from '../models/File';

const uploadMulter = multer(upload).single('file');

class PhotoController {
  store(request, response) {
    return uploadMulter(request, response, async (err) => {
      if (err) {
        return response.status(400).json({
          errors: [err.code],
        });
      }

      try {
        const { originalname, filename } = request.file;
        const { student_id } = request.body;
        const file = await File.create({ originalname, filename, student_id });

        return response.json(file);
      } catch (e) {
        return response.status(400).json({
          errors: ['Whopps: O aluno não existe!'],
        });
      }
    });
  }
}

export default new PhotoController();
