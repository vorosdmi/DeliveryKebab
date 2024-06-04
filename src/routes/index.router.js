const indexRouter = require('express').Router();
const renderTemplate = require('../utils/renderTemplate');
const Home = require('../views/pages/Home');
const { User, Order } = require('../../db/models')

indexRouter.get('/', (req, res) => {
  // const { login } = req.app.locals.user;
  const { number } = req.session; //! из SESSION
  if (number) {
  const user = User.findOne({where: { number }})

  const orders = Order.findAll({where: {isAccepted: true}})
  renderTemplate(Home, { number, user, orders }, res);
  } else {
    const orders = Order.findAll({where: {isAccepted: true}})
    renderTemplate(Home, { orders }, res);
  }
});



indexRouter.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('cookieName');
    res.redirect('/');
  });
});

module.exports = indexRouter;