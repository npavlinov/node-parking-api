'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parkingId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Parkings',
          key: 'id'
        }
      },
      voucherId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Vouchers',
          key: 'id'
        }
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      entryTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      exitTime: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Vehicles');
  }
};