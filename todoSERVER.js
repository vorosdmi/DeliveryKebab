//! В env ничего НЕТ!
//! unique
//!? api router
//! unique: true,
//! везде меняем название роутера главной страницы!!

// ! Инициализация проекта
// * npm init -y
// * npx eslint --init
// * npx create-gitignore node
//! установить библиотеки, прописать скрипты
// * npm i express
// * npm i -D nodemon morgan
//! Установка React и babel 
// преобразование синтаксиса JSX
// * npm i @babel/core @babel/preset-env @babel/preset-react @babel/register react react-dom
// todo создай файл .babelrc и добавь в него:
//! Внутрь .babelrc
/*
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
*/
// todo Добавь скрипты dev и start в package.json
/*
"dev": "nodemon app.js --ext js,jsx",
"start": "node app.js"
*/


//! Поднять сервер

const express = require('express');
const morgan = require('morgan');
require('@babel/register');
const path = require('path');

const app = express(); //создаём экземпляр сервера
const PORT = 3000;

app.use(morgan('dev')); //для того, чтобы сервер перезагружался сам в режиме разработки
app.use(express.json()); //позволяет работать с json форматом
app.use(express.urlencoded({ extended: true })); 
//используется в Express для обработки данных, отправленных через HTML-формы с методом POST или PUT. 
//Этот обработчик парсит URL-кодированные данные и добавляет их в объект req.body, что позволяет удобно работать с этими данными в маршрутах.
app.use(express.static(path.join(process.cwd(), 'public'))); //  Подключаем статику (Статика - только клиентские файлы, не связаны с сервом)
//ручка
app.get('/', (req, res) => {
  res.send(
    `<div сlass='header'><p>Текст на главной странице!<p>Текст на главной странице!</p></p></div>`
  );
});

app.listen(PORT, () => {
  console.log(`Сервак крутится на порту ${PORT}!`);
});

//!================================================================


// * npm i dotenv
// ! зайди в .sequelizerc и напиши require('dotenv').config()
// ! зайди в database.json и поменяй development на переменную окружения
// ! зайди в app.js и напиши require('dotenv').config()

// ! вынесем переменные в .env
// * устанавливаем пакет (npm i dotenv)
// * создаём файл .env
// * переносим в файл порт
// * реквайрим библиотеку в app.js (require('dotenv').config();)
// * заменяем порт на process.env.PORT
// * можем вынести подключение к БД, в конфиге пишем следующее:
/*
    "development": {
      "use_env_variable": "DATABASE"
    },
*/
// * а в .env помещаем строку подключения к БД со своими данными
// * DATABASE = "postgres://user:pass@example.com:5432/dbname"

// ! в app.js
require('dotenv').config();

const { PORT } = process.env;

//! .sequelizerc
require('dotenv').config();
const path = require('path');

module.exports = {
  config: path.resolve('db', 'config', 'database.json'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations'),
};

//! .env
PORT=3000
DATABASE=postgres://user1:123@localhost:5432/p2w1d3tigers

//! .envexample
PORT=XXXX
DATABASE=[dialect]://[user]:[pass]@[host]:[port]/[db_name]

//! config database.json
"development": {
  "use_env_variable": "DATABASE"
},



// ? Подключение bootstrap
/*
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
*/        

//!================================================================
//! Вынесим шаблон для рендера React-компонента
//* создаем папки
//* создаем папку utils
//* внутри renderTemplate.js

require('@babel/register');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const renderTemplate = (component, props, res) => {
  const element = React.createElement(component, props);
  const html = ReactDOMServer.renderToStaticMarkup(element);
  res.write('<!DOCTYPE html>');
  res.end(html);
};

module.exports = renderTemplate

//* создаем layout и вьюшки

const React = require('react');

function Layout({ children }) {
    return (
      <html lang='ru'>
        <head>
          <meta charSet='UTF-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <title>P2W2D3</title>
          <link href='/css/style.css' rel='stylesheet' />
        </head>
        <body>
          <div>{children}</div>
          <script
          />
          <script src='/js/client.js' />
        </body>
      </html>
    );
  };

  module.exports = Layout



//* пишем роуты

//!пишем ручку в папке роутеры
//! не забудь отключить на апп.джс

const { Router } = require("express");
const renderTemplate = require('../utils/renderTemplate');  //* Используем renderTemplate
const Main = require('../views/pages/Main')

const indexRouter = new Router();

indexRouter.get('/', (req, res) => {
    renderTemplate(Main, {}, res);
  });
  

module.exports = indexRouter

//!реквайрим в app.js
const indexRouter = require('./src/routes/indexRouter');

//! подключаем к мидлварке
app.use('/', indexRouter);

//? app.js
const indexRouter = require('./src/routes/indexRouter');
const apiRouter = require('./src/routes/apiRouter')

app.use('/', indexRouter);
app.use('/api', apiRouter)

//? indexRouter
indexRouter.get("/", (req, res) => {
  renderTemplate(Greeting, {}, res);
});

//? apiRouter
const { Router } = require("express");
const bookRouter = require('./bookRouter');

const apiRouter = new Router();

module.exports = apiRouter.use('/book', bookRouter);

//? bookRouter



// !!! Session + bcrypt
// ! Установи
// * npm i express-session session-file-store bcrypt
// !!! В package.json "dev": "nodemon src/app.js --ignore sessions --ext js,jsx",
// !!! Добавь папку sessions в gitignore
// sessions
// !!! В .env добавь SESSION_SECRET=вашасекретнаяфраза
// SESSION_SECRET=Mellon 

// * Конфиг для куки в виде файла сессии
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

//? app.js
const session = require('express-session');
const FileStore = require('session-file-store')(session);

// * Подключи сессии

app.use(session(sessionConfig));
// ? захэшировать и сверить
// * bcrypt.hash()
// * bcrypt.compare()


//! Перед проверками логина с сессий ОБЯЗАТЕЛЬНО нужно повешать мидлварки
//! сделать логаут
//! не забыть подкдючить скрипты к логину/ регистрации