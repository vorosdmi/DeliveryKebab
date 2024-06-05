const indexRouter = require("express").Router();
const renderTemplate = require("../utils/renderTemplate");
const Home = require("../views/pages/Home");
const { User, Order } = require("../../db/models");
const { checkUser, checkUserCart } = require("../middlewares/common");
const Cart = require("../views/pages/Cart");

//? home рендеринг

indexRouter.get("/", async (req, res) => {
  // const { login } = req.app.locals.user;
  const { number, userId, userName } = req.session; //! из SESSION
  if (number) {
    //const user = await User.findOne({where: { number }})

    const orders = await Order.findAll({ where: { isAccepted: false } });
    const ordersRes = orders.map((el) => el.get({ plain: true }));
    const ordersRes2 = ordersRes.filter((el) => !(el.clientId === userId));
    //console.log('OOR@@@', ordersRes2.length);
    renderTemplate(Home, { number, userName, userId, orders: ordersRes2 }, res);
  } else {
    const orders = await Order.findAll({ where: { isAccepted: false } });
    const ordersRes = orders.map((el) => el.get({ plain: true }));
    console.log(ordersRes);
    renderTemplate(Home, { orders: ordersRes }, res);
  }
});

//? home добавление в корзину

indexRouter.patch("/:idOrder/", async (req, res) => {
  //* update
  const { idOrder } = req.params;
  const { userId, userLocation } = req.body;

  try {
    const order = await Order.findOne({ where: { id: idOrder } });

    if (!order) {
      return res.status(404).json({ status: "error", message: " not found" });
    }
    order.clientId = userId;
    order.clientAddress = userLocation;
    order.save();

    res.json({ status: "success" });
  } catch (err) {
    console.log(`Error on taskRouter.patch(${id}) ====>>>>`, err);
    res.status(500).json({ error: "Error updating task" });
  }
});

//? корзина рендеринг

indexRouter.get("/cart/:id", checkUserCart, async (req, res) => {
  const { number, userId, userName } = req.session; //! из SESSION
  //console.log(req.params.id);

  //const user = await User.findOne({where: { number }})

  const orders = await Order.findAll({ where: { isAccepted: false } });
  const ordersRes = orders.map((el) => el.get({ plain: true }));
  const ordersRes2 = ordersRes.filter((el) => el.clientId === userId);
  //console.log('OOR@@@', ordersRes2.length);
  renderTemplate(Cart, { number, userName, userId, orders: ordersRes2 }, res);
});

//? удаление из корзины

indexRouter.patch("/cart/:orderId", async (req, res) => {
  //* update
  const { orderId } = req.params;

  try {
    const order = await Order.findOne({ where: { id: orderId } });

    if (!order) {
      return res.status(404).json({ status: "error", message: " not found" });
    }
    order.clientId = null;
    order.clientAddress = null;
    order.save();

    res.json({ status: "success" });
  } catch (err) {
    console.log(`Error on taskRouter.patch(${id}) ====>>>>`, err);
    res.status(500).json({ error: "Error updating task" });
  }
});

//? оформляем заказ

indexRouter.patch("/cart/allarders/:userId", async (req, res) => {
  //* update
  const { userId } = req.params;
  //const { userId } = req.body //! clientAddress, clientId
  console.log("*********** ", userId);
  try {
    console.log("*");
    const orders = await Order.findAll({ where: { clientId: userId } });
    console.log("ORDERSSS ", orders);
    if (!orders) {
      return res.status(404).json({ status: "error", message: " not found" });
    }

    for (let el of orders) {
      el.isAccepted = true;
      await el.save();
    }

    res.json({ status: "success" });
  } catch (err) {
    console.log(`Error on taskRouter.patch(${userId}) ====>>>>`, err);
    res.status(500).json({ error: "Error updating task" });
  }
});

indexRouter.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("cookieName");
    res.redirect("/");
  });
});

module.exports = indexRouter;
