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
    const { name, password, number, email } = req.body;
    //! здесь можно написать регулярку для номера тел
    const user = await User.findOne({ where: { number } });
    if (user) {
      console.log(`User with number phone ${number} already exists`);
      res.json({ regErr: `User number phone ${number} already exists` }); // для fetch-a
    } else {
      //! bcrypt hash
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, password: hash, number, email });
      req.session.number = newUser.number; // или EMAIL или MAIL
      req.session.userId = newUser.id; 
      req.session.userName = newUser.name; 
      req.session.isCourier = newUser.isCourier;
      req.session.save(() => {
        res.json({ regDone: `Registration succes ${number}` }); // для fetch-a
        // res.redirect('/');
      });
    }
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = regRouter;