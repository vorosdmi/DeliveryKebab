const indexRouter = require("express").Router();
const renderTemplate = require("../utils/renderTemplate");
const Home = require("../views/pages/Home");
const { User, Order } = require("../../db/models");
const { checkUser, checkUserCart } = require("../middlewares/common");
const Cart = require("../views/pages/Cart");
const nodemailer = require("nodemailer");

//? home рендеринг

indexRouter.get("/", async (req, res) => {
  // const { login } = req.app.locals.user;
  const { number, userId, userName } = req.session; //! из SESSION
  if (number) {
    //const user = await User.findOne({where: { number }})

    const orders = await Order.findAll({ where: { isAccepted: false } });
    const ordersRes = orders.map((el) => el.get({ plain: true }));
    const ordersRes2 = ordersRes.filter((el) => !(el.clientId === userId));
    const ordersCart = ordersRes.filter((el) => (el.clientId === userId));
    console.log('ordersRes2 >>> ', ordersRes2);
    console.log('ordersCart >>> ', ordersCart);
    
    const user = await User.findByPk(userId);
    if (user.isCourier) {
      res.redirect('/orders/courier')
    } else {
      renderTemplate(Home, { number, userName, userId, orders: ordersRes2, ordersCart }, res);
    }
  } else {
    const orders = await Order.findAll({ where: { isAccepted: false } });
    const ordersRes = orders.map((el) => el.get({ plain: true }));

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


indexRouter.patch("/cart/allorders/:userId", async (req, res) => {
  const { userId } = req.params;
  const { userName, number } = req.session; // Предполагается, что эти данные хранятся в сессии
  console.log("*********** ", userId);

  try {
    // Обновляем заказы
    console.log("*");
    const orders = await Order.findAll({ where: { clientId: userId } });

    console.log("ORDERSSS ", orders);
    if (!orders || orders.length === 0) {
      return res.status(404).json({ status: "error", message: "Заказы не найдены" });
    }

    for (let el of orders) {
      el.isAccepted = true;
      await el.save();

      // Настраиваем транспортер для отправки email
      const transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
          user: "chectb@mail.ru",
          pass: "x2V9PHZRGh0hx5zfcsEe",
        },
      });

      const courier = await User.findOne({ where: { id: el.courierId }});

      await transporter.sendMail({
        from: "chectb@mail.ru",
        to: courier.email,
        subject: `Заказ от пользователя ${userName}`,
        text: `Имя: ${userName}\nТелефон: ${number}\nID пользователя: ${userId}`,
        html: `
          <p><strong>Имя:</strong> ${userName}</p>
          <p><strong>Телефон:</strong> ${number}</p>
          <p><strong>ID пользователя:</strong> ${userId}</p>
        `,
      });
    }

    res.json({
      status: "success",
      message: "Заказы обновлены и уведомление отправлено",
    });
  } catch (err) {
    console.log(`Ошибка в taskRouter.patch(${userId}) ====>>>>`, err);
    res.status(500).json({
      error: "Ошибка при обновлении заказов или отправке уведомления",
    });
  }
});

    
indexRouter.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("cookieName");
    res.redirect("/");
  });
});

module.exports = indexRouter;
