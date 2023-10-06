'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('teachers', 'phoneNumber', {
      type: Sequelize.STRING
    });

    await queryInterface.addColumn('teachers', 'country', {
      type: Sequelize.STRING
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('teachers', 'phoneNumber');
    await queryInterface.removeColumn('teachers', 'country');
  }
};

