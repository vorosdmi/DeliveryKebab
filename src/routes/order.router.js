const orderRouter = require('express').Router();
const { Order } = require('../../db/models');
const Courier= require('../views/pages/Сourier');

// 1. Ручка get('/courier') - все заказы курьера
orderRouter.get("/courier", async (req, res) => {
  const { login, userId } = req.session;
  try {
    const orders = await Order.findAll({
      where: {courierId : userId}, 
      raw: true 
    });
    renderTemplate(Courier, { login, orders }, res);
  } catch (error) {
    res.send(`Ошибка страницы курьера: , ${error}`);
  } 
});

// #TODO 
// 2. Ручка post('/') - создание нового заказа курьером (заполняем в Orders поля courierId и courierAddress)

// #TODO 
// 3. Ручка patch('/client/:id') - клиент нажимает Заказать (заполняем в Orders поля clientId и clientAddress)

// #TODO 
// 4. Ручка patch('/courier/:id') - курьер нажимает Принять заказ (заполняем в Orders поле isAccepted)

module.exports = orderRouter;