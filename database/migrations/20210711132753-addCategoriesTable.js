'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      dayTax: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nightTax: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      spaceSize: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Categories');
  }
};