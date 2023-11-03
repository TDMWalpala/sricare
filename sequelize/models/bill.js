'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bill extends Model {
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
  bill.init({
    bill_id: {
      type:DataTypes.INTEGER,
      primaryKey:true
      ,autoIncrement:true
    } ,
    user_id:{
        references:{
            key:'user_id',
            model:'application_user'
        }
    },
    title: DataTypes.TEXT,
    payment: DataTypes.INTEGER,
    description: DataTypes.TEXT,

  }, {
    sequelize,
    modelName: 'bill',
    underscored:true,
    freezeTableName: true
  });
  return bill;
};