'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class service_user extends Model {
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
  service_user.init({
    service_id: {
      type:DataTypes.INTEGER,
      primaryKey:true
      ,autoIncrement:true
    } ,
     user_id: {
      type:DataTypes.INTEGER,
      primaryKey:true
      ,autoIncrement:true
    } ,
    status: DataTypes.TEXT,
   

  }, {
    sequelize,
    modelName: 'service_user',
    underscored:true,
    freezeTableName: true
  });
  return service_user;
};