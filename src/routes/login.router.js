const loginRouter = require('express').Router();
const renderTemplate = require('../utils/renderTemplate');
const bcrypt = require('bcrypt');

const Login = require('../views/pages/Login');

const { User } = require('../../db/models');

loginRouter.get('/', (req, res) => {
  renderTemplate(Login, null, res);
});

// loginRouter.post('/', async (req, res) => {
//   try {
//     const { number, password } = req.body;
//     const user = await User.findOne({ where: { number } });

//     if (!user) {
//       console.log(`user not found`);
//       res.json({ message: `not found` });
//     } else {
//       const checkPass = await bcrypt.compare(password, user.password);
//       if (checkPass) {
//         req.session.number = user.number;
//         req.session.save(() => {
//           console.log('Password correct. Session saved');
//           res.json({ message: `found`})
//         });
//       } else {
//         console.log('Wrong password');
//         res.json({ message: `Password is incorrect` });
//         // res.json({ passErr: `Password is incorrect`}) //* для fetch-a
//       }
//     }
//   } catch (error) {
//     console.log(`loginRouter.post =>`, error);
//     res.redirect("/")
//   }
// });


loginRouter.post('/', async (req, res) => {
  try {
    const { name, password, number } = req.body;
    const user = await User.findOne({ where: { number } });
   
    if (!user) {
      console.log(`user not found user`);
      res.json({ message: `not found` });
    } else {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        req.session.number = user.number;    //! or email
        req.session.save(() => {
          //const { id } = user
          console.log('Password correct. Session saved');
          res.json({ message: `found`});
        });
      } else {
        console.log('Wrong password');
        res.json({ message: `Password is incorrect` });
      }
    }
  } catch (error) {
    console.log(`loginRouter.error =>`, error);
    res.redirect("/api/farm");   //! 
  }
});

module.exports = loginRouter;