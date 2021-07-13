'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      return await queryInterface.bulkInsert('Parkings', [{
        spaces: 200,
        dayTaxTimeStart: 28800,
        dayTaxTimeEnd: 64800,
        nightTaxTimeStart: 64800,
        nightTaxTimeEnd: 28800
      }])
      .then(() => {
        return queryInterface.bulkInsert('Categories', [{
          type: 'A',
          dayTax: 3,
          nightTax: 2,
          spaceSize: 1
        },{
          type: 'B',
          dayTax: 6,
          nightTax: 4,
          spaceSize: 2
        },{
          type: 'C',
          dayTax: 12,
          nightTax: 8,
          spaceSize: 4
        }])
        .then(() => {
          return queryInterface.bulkInsert('Vouchers', [{
            type: "Silver",
            discountPercentage: 10
          }, {
            type: "Gold",
            discountPercentage: 15
          }, {
            type: "Platinum",
            discountPercentage: 20
          }])
        })
      })
    } catch(err) {
      console.log(err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
