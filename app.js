require('dotenv').config();
require('@babel/register');
const express = require("express");
const morgan = require("morgan");
const React = require("react");
const ReactDomServer = require('react-dom/server');
const renderTemplate = require('./src/utils/renderTemplate');
const Home = require('./src/views/pages/Home');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const nodemailer = require('nodemailer')


const indexRouter = require('./src/routes/index.router');
const loginRouter = require('./src/routes/login.router');
const regRouter = require('./src/routes/reg.router');

const { checkUser, secureRoute } = require('./src/middlewares/common');
const orderRouter = require('./src/routes/order.router');

const app = express();
const { PORT } = process.env;

const sessionConfig = {
  name: 'cookieName', // не забудь указать то же имя и при удалении куки
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Mellon', // SESSION_SECRET в .env
  resave: false, // если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // если false, куки появятся только при установке req.session
  cookie: {
    maxAge: 24 * 1000 * 60 * 60, // время жизни в ms, 24(h)*1000(ms)*60(sec)*60(min) = 86400000
    httpOnly: true, // секьюрность, оставляем true
  },
};

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(session(sessionConfig));

app.use('/login', secureRoute, loginRouter);
app.use('/register', secureRoute, regRouter);
app.use('/', indexRouter);
app.use('/orders', orderRouter);
// app.use('/cart/allarders/:userId', indexRouter);



app.listen(PORT, () => {
  console.log(`Сервак крутится на порту ${PORT}!`);
});
