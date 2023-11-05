'use strict';
const {
  Model
} = require('sequelize');
const application_user = require('./application_user');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.application_user,{foreignKey:'user_id'})
    }
  }
  notification.init({
    noti_id: {
      type:DataTypes.INTEGER,
      primaryKey:true
      ,autoIncrement:true
    } ,
    user_id:{
        type:DataTypes.INTEGER,
        references:{
            key:'user_id',
            model:'application_user'
        }
    },
    status: DataTypes.TEXT,
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,

  }, {
    sequelize,
    modelName: 'notification',
    underscored:true,
    freezeTableName: true
  });
  return notification;
};