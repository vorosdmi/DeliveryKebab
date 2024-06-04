//! Создание клиентского JS-файла и подключение его на нужную страницу
//! Название файла с моей лекции, так что называйте, как вам нужно и выбирайте любого питомца
//! которого вы захотите

//* в public создаём файл getDataFromAPi.js в папке js

//________________________________________________________________

//* подключаем этот файл на нужную страницу - MockData.jsx

// <script defer src='/js/getDataFromAPi.js' />

//________________________________________________________________

//* В файле getDataFromAPi логируем подключение: нужно убедиться, что всё работает

// console.log('Успешное подключение скрипта')

//!________________________________________________________________

//! Работа с DOM и fetch для получения данных от удаленного сервера и отрисовки
//! в getDataFromAPi.js

//* Вытаскиваем элемент и вешаем на него асинхронный слушатель

// const getDataBtn = document.querySelector('.getData'); //! .getData - кнопка во вьюшке
// getDataBtn.addEventListener('click', async (e) => {...

//________________________________________________________________

//* В слушателе пишем fecth() на удаленный сервер

// const response = await fetch('https://jsonplaceholder.typicode.com/todos');

//________________________________________________________________

//* Дожидаемся ответа от сервера и парсим

// const result = await response.json();

//________________________________________________________________

//* Смотрим, что пришло

// console.log(result);

//________________________________________________________________

//* Превращаем каждый элемент пришедшего массива в компонент
//* и вставляем на страницу

// result.slice(0, 20).forEach((todo) => {
//  const card = document.createElement('div');
//   card.className = 'taskCard';

//   const title = document.createElement('h3');
//   title.textContent = todo.title;

//   const completed = document.createElement('p');
//   completed.textContent = todo.completed ? 'Completed' : 'Not completed';
//   completed.style.color = todo.completed ? 'green' : 'red';

//   card.append(title);
//   card.append(completed);
//   container.append(card);
// });

//________________________________________________________________

//* ВЫ БЕСПОДОБНЫ!

//________________________________________________________________

//! Переписываем работу с сущностью TASK на фечи

//* в public в папке js создаём файл task.js

//________________________________________________________________

//* подключаем этот файл в нужную вьюшку (Tasks.js)

// <script defer src='/js/task.js' />;

//________________________________________________________________

//* Логируем подключение, нужно убедиться, что всё работает

// console.log('Успешное подключение скрипта')

//________________________________________________________________

//* Внутри вьюшки убираем форму на удаление и добавляем id кнопке, чтобы работать с ней
//* на клиенте и удалять нужную запись

//! БЫЛО ====>>>

{
  /* <form action={`/tasks/delete/${task.id}`}>
  <button className='cardBtn' type='submit'>
    Delete Task
  </button>
</form>; */
}

//! СТАЛО ====>>>

{
  /* <button className='cardBtn' type='button' id={task.id}>
  Delete Task
</button>; */
}

//________________________________________________________________

//* Вытаскиваем контейнер на клиенте в файле task.js в public и вешаем слушатель на click

// const tasksContainer = document.querySelector('.tasksContainer');

// tasksContainer.addEventListener('click', async (event) => {

//________________________________________________________________

//* Логируем target и ключ id

// console.log(event.target);
// console.log(event.target.id);

//________________________________________________________________

//* Проверяем, что кликнули по нужной кнопке

// if (event.target.classList.contains('cardBtn')) {

//________________________________________________________________

//* Пишем fetch на удаление

// const { id } = event.target;
// try {
//   const response = await fetch(`/tasks/delete/${id}`);

//   const result = await response.json();

// } catch (error) {
//   console.error('Error:', error);
// }

//* В ручке на удаление меняем ответ

//! БЫЛО ===>>>

// await Task.destroy({ where: { id } });
// res.redirect('/tasks');

//! СТАЛО ===>>>

// await Task.destroy({ where: { id } });
// res.json({ success: true, messageId: id });

//* Логируем ответ на клиенте

// console.log(result); --- {success: true, messageId: '15'}

//________________________________________________________________

//* Если ответ положительный, ищем карточку (можно по-разному)
//* и удаляем её с фронта (на беке она итак удалилась)

// if (result.success) {
//   const deletedTaskCard = event.target.parentNode;
//   deletedTaskCard.remove();
// } else {
//   console.error('Failed to delete the task');
// }

//________________________________________________________________

//* ВЫ БЕСПОДОБНЫ СНОВА!

//!________________________________________________________________

//! Переписываем добавление карточки на феч

//* в форме сносим метод и путь

//! БЫЛО ===>>>

{
  /* <form action='/tasks/create' method='post' className='addTaskForm'>
  <input type='text' name='title' placeholder='Title' required />
  <input type='text' name='description' placeholder='Description' required />
  <button type='submit'>Add Task</button>
</form>; */
}

//! СТАЛО ===>>>

{
  /* <form className='addTaskForm'>
  <input type='text' name='title' placeholder='Title' required />
  <input type='text' name='description' placeholder='Description' required />
  <button type='submit'>Add Task</button>
</form>; */
}

//________________________________________________________________

//* вытаскиваем форму на фронт, вешаем слушатель, останавливаем перезагрузку

// const form = document.querySelector('.addTaskForm');

// form.addEventListener('submit', async (event) => {
//   event.preventDefault();

//   console.log('форма');
// });

//________________________________________________________________

//* Меняем ручку так, чтобы она отправляла новую таску

//! БЫЛО ===>>>

// await Task.create({ title, description });
// res.redirect('/tasks');

//! СТАЛО ===>>>

// const newTask = await Task.create({ title, description });
// res.json(newTask);

//________________________________________________________________

//* На клиенте получаем данные из формы с помощью new FormData()

// const formData = new FormData(form);
// const inputs = Object.fromEntries(formData);

// console.log(inputs);

//________________________________________________________________

//* Пишем феч на создание записи в БД

// try {
// 	const response = await fetch('/tasks/create', {
//	  method: 'POST',
//	  headers: { 'Content-Type': 'application/json' },
// 	  body: formData,
// 	});

//	const newTask = await response.json();

//	console.log(newTask);
//  } catch (error) {
// 	console.error('Error:', error);
//  }

//________________________________________________________________

//* Если ответ пришел положительный, создаем новую карточку и
//* добавляем на страницу

// if (newTask) {
//  const tasksContainer = document.querySelector('.tasksContainer');
//   const taskElement = document.createElement('div');
//   taskElement.className = 'taskCard';
//   taskElement.innerHTML = `
// 	 <h3>${newTask.title}</h3>
// 	 <p>${newTask.description}</p>
// 	 <button class='cardBtn' type='button' id='${newTask.id}'>Delete Task</button>
//   `;
//   tasksContainer.appendChild(taskElement);
// }

//________________________________________________________________

//* Очищаем инпуты

// form.querySelectorAll('input').forEach((input) => {
//   input.value = '';
// });

//________________________________________________________________

//* ВЫ БЕСПОДОБНЫ В ТРЕТИЙ РАЗ! УДАЧИ!
