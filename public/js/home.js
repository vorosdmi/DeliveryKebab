const container = document.querySelector(".containerAll");
const elementAddresses = document.querySelector(".containerMap");
const addressesArr = elementAddresses.dataset.addresses;
const addresses = addressesArr.split(";");
addresses.pop();
const userId = elementAddresses.dataset.userid;
const number = elementAddresses.dataset.number;
let ordersCarts = '';
let CARTS = 0;
if (number) {
  ordersCarts = elementAddresses.dataset.ordercards; 
  console.log('1!!!', ordersCarts); 
  CARTS = JSON.parse(ordersCarts).length;
}
console.log('2!!!', CARTS);
const cartNav = document.querySelector('.cartNav')

const allOrders = container.dataset.allorders;
const allOrdersRes = JSON.parse(allOrders);
console.log(1, allOrdersRes);

//! геолокация
const ymaps = window.ymaps;

function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getCityName(latitude, longitude);
        console.log(`Широта: ${latitude}, Долгота: ${longitude}`);

        // Создаем карту и добавляем метку
        ymaps.ready(function () {
          const myMap = new ymaps.Map("mymap", {
            center: [latitude, longitude],
            zoom: 12, //уровень приближения
            //controls: ["routePanelControl"],
          });

          const calculateDistances = async () => {
            // Создаем массив промисов
            const promises = allOrdersRes.map((order, i) => {
              return ymaps
                .route([
                  [latitude, longitude],
                  {
                    type: "viaPoint",
                    point: [latitude, longitude],
                  },
                  order.courierAddress,
                ])
                .then(
                  function (route) {
                    const routeLength = route.getLength() / 1000;
                    order.distance = routeLength.toFixed(2);
                  },
                  function (error) {
                    console.log(error);
                  }
                );
            });

            // Ждем выполнения всех промисов
            await Promise.all(promises);

            // После завершения всех промисов выводим результат
            console.log(
              "RESULT ",
              allOrdersRes.map((order) => order.distance)
            );
            allOrdersRes.sort((a, b) => a.distance - b.distance);
            console.log("SORT ", allOrdersRes);

            const resultContainer = allOrdersRes.map(
              (order) =>
                `<div class="card" key=${order.id}>
              <img
                src=${order.url}
                class="card-img-topp"
                alt="food"
                width="150"
                height="150"
              />
              <div class="card-content">
                <div class="card-title">${order.name}</div>
                <div class="card-text">
                <span class="discounted-price">${Number(order.price) - (Number(order.price) * Number(order.discount)) / 100}p.</span>
                  <span class="original-price">${order.price}p.</span>
                  <span class="discount-percentage">(-${order.discount}%)</span>
                </div>
                <div class="card-text">Расстояние до вас: ${order.distance}км.</div>
                <div class="card-text">${order.courierAddress}</div>
                <a
                  class=${number ? "btn-add" : "elementHiddn"}
                  data-location=""
                  data-odrerlocation=""
                  data-courierlocation=${order.courierAddress}
                  data-orderid=${order.id}
                  data-userid=${userId}
                >
                  добавить в корзину
                </a>
              </div>
            </div>`
                );

            container.innerHTML = resultContainer.join(" ");

            console.log("RESULTCONT", resultContainer);
          };

          // Вызов функции для расчета расстояний
          calculateDistances();

          //! Добавляем my метку на карту
          const myPlacemark = new ymaps.Placemark(
            [latitude, longitude],
            { hintContent: `Я тут!` },
            {
              // iconLayout: 'default#image',
              // iconImageHref: '../img/ppp.png',
              // iconImageSize: [30, 30],
              // iconImageOffset: [-15, -50],
              preset: "islands#redDotIcon", // Стиль метки
            }
          );

          myMap.geoObjects.add(myPlacemark);

          // Добавляем метки на карту по адресам
          addresses.forEach((address) => {
            addPlacemarkByAddress(address, myMap);
          });
        });
      },
      function (error) {
        console.error("Ошибка получения местоположения: ", error);
      }
    );
  } else {
    console.error("Геолокация не поддерживается этим браузером.");
  }
}

//! Функция для геокодирования адреса и добавления метки на карту
function addPlacemarkByAddress(address, map) {
  ymaps
    .geocode(address)
    .then(function (res) {
      const firstGeoObject = res.geoObjects.get(0);
      const coordinates = firstGeoObject.geometry.getCoordinates();

      const placemark = new ymaps.Placemark(
        coordinates,
        {
          balloonContent: address,
        },
        {
          preset: "islands#blueDotIcon", // Стиль метки
        }
      );

      map.geoObjects.add(placemark);
    })
    .catch(function (error) {
      console.error("Ошибка при геокодировании адреса:", error);
    });
}

//!
function getCityName(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const address = data.address;
      const city = address.city || address.town || address.village;
      const road = address.road || "";
      const houseNumber = address.house_number || "";
      const fullAddress = `город ${city}, ${road}, дом ${houseNumber}`;
      const locationElements = document.querySelectorAll(".btn-add");
      //console.log(locationElements);
      if (locationElements) {
        locationElements.forEach(
          (el) => (el.dataset.location = `${fullAddress}`)
        );
      } else {
        console.error('Элемент с id "location" не найден в HTML-документе.');
      }

      console.log(`Полный адрес: ${fullAddress}`);
    })
    .catch((error) => {
      console.error("Ошибка запроса: ", error);
    });
}

getLocation();

//? добавление в корзину

container.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-add")) {
    console.log(e.target);

    const orderId = e.target.dataset.orderid;
    const userId = e.target.dataset.userid;
    const userLocation = e.target.dataset.location;
    // const odrerLocation = e.target.dataset.odrerlocation
    //  console.log('***** ', odrerLocation);

    try {
      const response = await fetch(`/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, userLocation }),
      });

      const res = await response.json();
      console.log(res.status);
      if (res.status === "success") {
        e.target.closest(".card").remove();
        CARTS +=1
        console.log('>>>>', CARTS);
        cartNav.innerHTML = `корзина<span class="text_cart">(${CARTS})</span>`;
        //cartNav.innerText = `корзина(${CARTS})`
      } else {
        alert("что-то пошло не так");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
});
