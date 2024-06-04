const indexRouter = require('express').Router();
const renderTemplate = require('../utils/renderTemplate');
const Home = require('../views/pages/Home');

indexRouter.get('/', (req, res) => {
  // const { login } = req.app.locals.user;
  const { login } = req.session; //! из SESSION
  renderTemplate(Home, { login }, res);
});

indexRouter.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('cookieName');
    res.redirect('/');
  });
});

module.exports = indexRouter;