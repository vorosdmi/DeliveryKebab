function getLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getCityName(latitude, longitude);
      },
      function (error) {
        console.log('Ошибка получения местоположения: ', error);
      }
    );
  } else {
    console.log('Геолокация не поддерживается этим браузером');
  }
}
function getCityName(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const locationDiv = document.querySelector('.locationDiv');
      locationDiv.innerText = `${data.display_name}`;
    })
    .catch((error) => {
      console.error('Ошибка запроса: ', error);
    });
}
getLocation();
const formNew = document.querySelector('.horizontal-form');




// РАССЧИТЫВАЕМ РАССТОЯНИЕ МЕЖДУ ТОЧКАМИ

// const apiKey = '513313f4-6089-4a80-b442-af1d3277a73e';
// const lat1 = 55.751574; // широта первой точки
// const lon1 = 37.573856; // долгота первой точки
// const lat2 = 55.753994; // широта второй точки
// const lon2 = 37.622093; // долгота второй точки

// const apiUrl = `https://api-maps.yandex.ru/services/route/2.1/?apikey=${apiKey}&lang=ru_RU&routingMode=auto&points=${lat1},${lon1}~${lat2},${lon2}`;

// fetch(apiUrl)
//   .then(response => response.json())
//   .then(data => {
//     // Извлечение расстояния из ответа API
//     const distance = data.routes[0].distance; // Расстояние в метрах
//     console.log("Расстояние между точками:", distance, "метров");
//   })
//   .catch(error => console.error("Ошибка:", error));

// ymaps.ready(init);

// function init() {
//     // Coordinates of the points
//     var pointA = [55.751244, 37.618423]; // Moscow
//     var pointB = [59.934280, 30.335099]; // Saint Petersburg

//     // Calculate the route between the points
//     ymaps.route([pointA, pointB]).then(function (route) {
//         // Add the route to the map
//         // myMap.geoObjects.add(route);

//         // Get the distance of the route
//         var distance = route.getLength();
//         alert("Distance between the points: " + distance + " meters");
//     }, function (error) {
//         alert("An error occurred: " + error.message);
//     });
// }





formNew.addEventListener('submit', async (e) => {
  // ДОБАВЛЕНИЕ
  e.preventDefault();
  const data = new FormData(formNew);
  const res = Object.fromEntries(data);
  res.courierAddress = document.querySelector('.locationDiv').innerText;
    try {
      const response = await fetch('/orders', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(res),
      });
      const result = await response.json();
      if (result.newError) {
        const errMsg = document.querySelector('.error');
        errMsg.innerText = result.newError;
      }
      if (result.newDone) {
        // Добавляем записи
        const order = result.newDone;
        const orderDiv = document.querySelector('.orderCourier-pictures');
        const newOrder = `
        <div class="order-container" key=${order.id}>
          <img src=${order.url} alt=${order.name} class="orderCourier-image" />
          <span class="order-text">${order.name}</span>  
          <a href="#" class="btn btn-danger btn-sm delete">Удалить</a> 
        </div>
        `;
        orderDiv.insertAdjacentHTML('beforeend', newOrder);
        formNew.querySelectorAll('input').forEach((el) => el.value = '');
      }
      
    } catch (error) {
      console.log(error);
      alert('Login error');
    }
});
