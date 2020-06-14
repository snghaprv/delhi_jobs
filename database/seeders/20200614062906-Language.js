'use strict';
const languages = require('../../dumps/Languages.json');
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Languages',
      languages , {
        updateOnDuplicate: ['label']
      });
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
