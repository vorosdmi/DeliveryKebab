const loginRouter = require('express').Router();
const renderTemplate = require('../utils/renderTemplate');
const bcrypt = require('bcrypt');

const Login = require('../views/pages/Login');

const { User } = require('../../db/models');

loginRouter.get('/', (req, res) => {
  renderTemplate(Login, null, res);
});

loginRouter.post('/', async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ where: { login } });
    if (!user) {
      console.log(`user not found`);
      res.redirect('/register');
    } else {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        req.session.login = user.login;
        req.session.userId = user.id;
        req.session.save(() => {
          console.log('Password correct. Session saved');
          res.redirect('/');
        });
      } else {
        console.log('Wrong password');
        res.redirect('/login');
        // res.json({ passErr: `Password is incorrect`}) //* для fetch-a
      }
    }
  } catch (error) {
    console.log(`loginRouter.post =>`, error);
  }
});

module.exports = loginRouter;