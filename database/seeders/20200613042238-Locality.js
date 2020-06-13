'use strict';
const localities = require('../../dumps/Localities.json');
module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Localities',
    localities, {
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
