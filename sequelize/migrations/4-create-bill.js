'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bill', {
      bill_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id:{
        type:Sequelize.INTEGER,
        references:{
          model:'application_user',
          key:'user_id',
          
        }
      },
      title: {
        type: Sequelize.TEXT
      },
      payment: {
        type: Sequelize.INTEGER
      },
       status: {
        type: Sequelize.TEXT
      },
     
         });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bill');
  }
};