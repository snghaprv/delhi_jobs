'use strict';
const qualifications = require('../../dumps/Qualifications.json');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Qualifications',
    qualifications, {
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
