'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notification', {
      noti_id: {
      type:Sequelize.INTEGER,
        references:{
          model:'service',
          key:'service_id',
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
      description: {
        type: Sequelize.TEXT
      },
       status: {
        type: Sequelize.TEXT
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
     
         });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('notification');
  }
};