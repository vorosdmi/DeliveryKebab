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
      locationDiv.innerText = `📍 ${data.display_name}`;
    })
    .catch((error) => {
      console.error('Ошибка запроса: ', error);
    });
}
getLocation();
const formNew = document.querySelector('.horizontal-form');

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
