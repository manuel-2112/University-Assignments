const fs = require('fs');
const path = require('path');

module.exports = {
  up: (queryInterface) => {
    const filePath = path.join(__dirname, '../data/categories.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    let { categories } = data;

    categories = categories.map((category) => {
      category.createdAt = new Date();
      category.updatedAt = new Date();
      return category;
    });

    return queryInterface.bulkInsert('Categories', categories, {});
  },
  down: (queryInterface) => queryInterface.bulkDelete('Categories', null, {}),
};
