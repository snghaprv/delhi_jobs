'use strict';
const cities = require('../../dumps/Cities.json');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cities',
        cities, {
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
