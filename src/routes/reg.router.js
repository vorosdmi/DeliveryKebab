const regRouter = require('express').Router();
const renderTemplate = require('../utils/renderTemplate');
const bcrypt = require('bcrypt');

const Register = require('../views/pages/Register');

const { User } = require('../../db/models');

regRouter.get('/', (req, res) => {
  renderTemplate(Register, null, res);
});

regRouter.post('/', async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ where: { login } });
    if (user) {
      console.log(`User with login ${login} already exists`);
      res.json({ regErr: `User with login ${login} already exists` }); // для fetch-a
    } else {
      //! bcrypt hash
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({ login, password: hash });
      req.session.login = newUser.login; // или EMAIL или MAIL
      req.session.save(() => {
        res.json({ regDone: `Registration succes ${login}` }); // для fetch-a
        // res.redirect('/');
      });
    }
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = regRouter;