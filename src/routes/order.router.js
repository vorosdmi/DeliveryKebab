const orderRouter = require('express').Router();
const { Order } = require('../../db/models');
const Courier= require('../views/pages/Сourier');
const renderTemplate = require('../utils/renderTemplate');
const { Op } = require('sequelize');

// 1. Ручка get('/courier') - все заказы курьера
orderRouter.get("/courier", async (req, res) => {
  const { number, userName, userId, isCourier } = req.session;
  try {
    const courierOrders = await Order.findAll({
      where: {
        courierId : userId,
        isReady : false,
        isAccepted: false,
      }, 
      raw: true 
    });
    const clientOrders = await Order.findAll({
      where: {
        courierId : userId,
        isReady : false,
        isAccepted: true,
        // clientId: {
        //   [Op.ne]: null, // Проверка, что clientId не равен null
        // }, 
      }, 
      raw: true 
    });
    renderTemplate(Courier, { number, userName, courierOrders, clientOrders, isCourier }, res);
  } catch (error) {
    res.send(`Ошибка страницы курьера: , ${error}`);
  } 
});

// 2. Ручка post('/') - создание нового заказа курьером (заполняем в Orders поля courierId и courierAddress)
orderRouter.post('/', async(req, res) => {
  const { name, url, price, discount, courierAddress } = req.body;
  // const clientId = 0;
  const clientAddress = '';
  const isAccepted = false;  
  const isReady= false;
  const courierId = req.session.userId;
  try { 
    const newOrder = await Order.create({ 
      name, 
      url, 
      price, 
      discount, 
      courierAddress, 
      courierId,
      clientAddress,
      isAccepted,
      isReady
    });
    res.json({ newDone: newOrder });  
  } catch (error) {
    console.log(error);
    res.json({newError: `Error! Something went wrong :(`})    
  }
})

orderRouter.delete('/:id', async(req, res) => {
  try { 
    await Order.destroy({ where: { id: +req.params.id } })
    res.json({ status: 'success' });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error' });    
  }
})

// #TODO 
// 3. Ручка patch('/client/:id') - клиент нажимает Заказать (заполняем в Orders поля clientId и clientAddress)

// #TODO 
// 4. Ручка patch('/courier/:id') - курьер нажимает Принять заказ (заполняем в Orders поле isAccepted)
orderRouter.patch('/courier/:id', async(req, res) => {
  try { 
    const curOrder = await Order.findOne({ where: { id: +req.params.id } })
    curOrder.isReady = true;
    await curOrder.save();
    res.json({ status: 'success' });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error' });    
  }
})

module.exports = orderRouter;