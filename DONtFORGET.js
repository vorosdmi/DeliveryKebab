/* eslint-disable max-len */
//! for Mail TZ5zsnhz5GReNVABskcf

//! CHANGE KONFIG

// ? создаем базу данных (npx sequelize db:create)

// ! Создаём и рассматриваем модели и миграции (модель в единственном числе)

// * npx sequelize-cli model:generate --name User --attributes name:string,password:string,curier:boolean,number:string
// * npx sequelize-cli model:generate --name Order --attributes name:string,url:string,firstprice:integer,skidka:integer,place:string,userId:integer,curierId:integer

//? Миграция для связующей таблицы
// * npx sequelize-cli model:generate --name UserChanel --attributes chanelId:integer,authorId:integer

// ! СВЯЗИ:  Работаем с миграциями
// * дописываем связь для 'Когинибудь' к 'Комунибудь'

/*
references: {
	model: 'Students',
	key: 'id',
},
onDelete: 'cascade',
allowNull: false,
*/

//* В промежуточной таблице

// book_id: {
// 	type: Sequelize.INTEGER,
// 	references: {
// 	  model: 'Books',
// 	  key: 'id',
// 	},
//  },
//  author_id: {
// 	type: Sequelize.INTEGER,
// 	references: {
// 	  model: 'Authors',
// 	  key: 'id',
// 	},
//  },

//* В двух главных таблицах никаких референсов не указываем
// ? * накатываем миграции (npx sequelize db:migrate)
// * ----------------------------------------------------------------

// ! СВЯЗИ: Работаем с моделями
// * "КТОТО" связаны с 'Кемто' так: this.belongsTo(models.Student, { foreignKey: 'owner_id' });
// * студенты связаны со компьютерами так: this.hasMany(models.Computer, { foreignKey: 'owner_id' });
// * ----------------------------------------------------------------
// ! Работаем с сидами

//* создаем каркас сида студентов (npx sequelize-cli seed:generate --name AuthorsSeed)
//* создаем каркас сида компкутеров (npx sequelize-cli seed:generate --name BooksSeed)

//* заполняем данными - см файлы в папке seeders
//* накатываем сиды (npx sequelize db:seed:all) - накатит все сиды

// ? накатить отдельный сид (если нужно) (npx sequelize db:seed --seed 20240304182116-StudentsSeed.js)

//* Выносим сиды в скрипт ("seed": "npx sequelize db:seed:all")
//! -----------CRUD-----CRUD------CRUD-------CRUD
//! READ
//* см crud/read.js
//! CREATE
//* см crud/create.js
//! UPDATE
//* см crud/update.js
//! DELETE
//* см crud/delete.js
// postgres=# DROP DATABASE IF EXISTS test1; //? команда для удаления БД
// DROP DATABASE

//! Работа с Кард и далее......