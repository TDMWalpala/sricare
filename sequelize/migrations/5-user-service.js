'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('service_user', {
      bill_id: {
      type:Sequelize.INTEGER,
        references:{
          model:'bill',
          key:'bill_id',
      }},
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
    await queryInterface.dropTable('service_user');
  }
};