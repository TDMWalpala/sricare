'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class service extends Model {
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
  service.init({
    service_id: {
      type:DataTypes.INTEGER,
      primaryKey:true
      ,autoIncrement:true
    } ,
    type: DataTypes.TEXT,
    payment: DataTypes.INTEGER,
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,

  }, {
    sequelize,
    modelName: 'service',
    underscored:true,
    freezeTableName: true
  });
  return service;
};