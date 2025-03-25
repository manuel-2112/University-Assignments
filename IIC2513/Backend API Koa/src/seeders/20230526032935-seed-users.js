module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      username: 'vicentelyon',
      password: 'vicente123',
      mail: 'vicentelyon@uc.cl',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'manuelespinoza',
      password: 'manuel123',
      mail: 'manuelespinoza@uc.cl',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
