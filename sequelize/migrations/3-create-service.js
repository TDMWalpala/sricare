'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('service', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.TEXT
      },
      payment: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.TEXT
      },
         });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('service');
  }
};