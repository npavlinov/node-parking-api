'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Parkings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spaces: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      dayTaxTimeStart: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      dayTaxTimeEnd: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nightTaxTimeStart: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nightTaxTimeEnd: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Parkings');
  }
};