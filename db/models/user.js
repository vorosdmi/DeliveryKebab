'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Order, { as: 'Client', foreignKey: 'clientId' });
      this.hasMany(models.Order, { as: 'Courier', foreignKey: 'courierId' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    curier: DataTypes.BOOLEAN,
    number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};