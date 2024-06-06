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
      this.belongsTo(models.User, { as: 'Client', foreignKey: 'clientId' });
      this.belongsTo(models.User, { as: 'Courier', foreignKey: 'courierId' });
    }
  }
  Order.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    courierId: DataTypes.INTEGER,
    courierAddress: DataTypes.STRING,
    clientId: DataTypes.INTEGER,
    clientAddress: DataTypes.STRING,
    isAccepted: DataTypes.BOOLEAN,
    isReady: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};