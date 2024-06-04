'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.User, { foreignKey: 'curierId' });
    }
  }
  Order.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    firstprice: DataTypes.INTEGER,
    skidka: DataTypes.INTEGER,
    place: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    curierId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};