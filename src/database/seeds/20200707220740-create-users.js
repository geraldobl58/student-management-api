const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users',
      // eslint-disable-next-line no-sparse-arrays
      [
        {
          firstname: 'John Doe',
          email: 'johndoe@email.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          firstname: 'Jane Doe',
          email: 'janedoe@email.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          firstname: 'Mark Miller',
          email: 'markmiller@email.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ], {

      });
  },

  down: async () => {

  },
};
