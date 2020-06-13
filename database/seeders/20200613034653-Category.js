'use strict';
const categories = require('../../dumps/Categories.json');
module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Categories',
      categories, {
        updateOnDuplicate: ['label']
      });
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('Categories', null, {});
  }
};
