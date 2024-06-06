const container = document.querySelector(".containerAll");
const elementAddresses = document.querySelector(".containerMap");
const addressesArr = elementAddresses.dataset.addresses;
const addresses = addressesArr.split(";");
addresses.pop();
const userId = elementAddresses.dataset.userid
const number = elementAddresses.dataset.number

const allOrders = container.dataset.allorders;
const allOrdersRes = JSON.parse(allOrders);
//allOrdersRes.shift();
console.log(1, allOrdersRes);
console.log(2, allOrdersRes[0].courierAddress);
console.log(3, allOrdersRes[0].clientAddress);
//console.log('addressesArr', JSON.parse(addressesArr));

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

          //????????
          // for (let i=0; i<allOrdersRes.length; i++) {

          //   let route = ymaps
          //   .route([
          //     [latitude, longitude],
          //     {
          //       type: "viaPoint",
          //       point: [latitude, longitude],
          //     },
          //     allOrdersRes[i].courierAddress,
          //   ])
          //   .then(
          //     function (route) {
          //       // myMap.geoObjects.add(route)
          // //! сохраняем в датасет расстояние
          //       const routeLength = route.getLength() / 1000;
          //       allOrdersRes[i].distance =  routeLength.toFixed(2)
          //     },
          //     function (error) {
          //       console.log(error);
          //     }
          //   );

          // }
          //??????????????
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
            allOrdersRes.sort((a, b) => a.distance - b.distance)
console.log('SORT ', allOrdersRes);



const resultContainer = allOrdersRes.map((order) => (
  `<div class="card" key=${order.id}>
  <div class="card-title">${order.name}</div>

  <div class="card-text">Исходная цена: ${order.price}p.</div>
  <div class="card-text">
    Цена со скидкой:
    ${Number(order.price) -
      (Number(order.price) * Number(order.discount)) / 100}
  </div>
  <div class="card-text">Расстояние до вас: ${order.distance}</div>
  <div class="card-text">
    
    📍 ${order.courierAddress}
  </div>
  <img
    src=${order.url}
    class="card-img-topp"
    alt="food"
    width="200"
    height="200"
  />
  <a
    href="#"
    class=${number ? "btn-add" : "elementHiddn"}
    data-location=""
    data-odrerlocation=""
    data-courierlocation=${order.courierAddress}
    data-orderid=${order.id}
    data-userid=${userId}
  >
    добавить в корзину
  </a>
</div>`
))

container.innerHTML = resultContainer.join(' ')

console.log('RESULTCONT', resultContainer);


          };

          // Вызов функции для расчета расстояний
          calculateDistances();

          //           //************* */
          // const newArr = [];
          // for (let i = 0; i < addresses.length; i++) {
          //   let route = ymaps
          //     .route([
          //       [latitude, longitude],
          //       {
          //         type: "viaPoint",
          //         point: [latitude, longitude],
          //       },
          //       addresses[i],
          //     ])
          //     .then(
          //       function (route) {
          //         // myMap.geoObjects.add(route)

          //         const routeLength = route.getLength() / 1000;
          //         newArr.push(`${addresses[i]}, ${routeLength}`);
          //       },
          //       function (error) {
          //         console.log(error);
          //       }
          //     );
          // }
          // console.log(newArr);
          // //******************************* */

          // addresses.forEach(el=>{
          // console.log(el);
          //   let control = myMap.controls.get("routePanelControl");
          //   control.routePanel.state.set({
          //     type: "masstransit",
          //     fromEnabled: false,
          //     from: `тюмень, 70 лет октября 26, `,
          //     toEnabled: true,
          //     to: `${el}`
          //   });

          //   control.routePanel.getRouteAsync().then(function (route) {
          //     route.model.events.add('requestsuccess', function () {
          //       var activeRoute = route.getActiveRoute();
          //       if (activeRoute) {
          //         var distance = activeRoute.properties.get("distance").value;
          //         var distanceText = activeRoute.properties.get("distance").text;
          //         console.log(`Расстояние: ${distance} метров`);
          //         console.log(`Расстояние (текст): ${distanceText}`);
          //       } else {
          //         console.error("Маршрут не найден");
          //       }
          //     });
          //   }).catch(function (error) {
          //     console.error("Ошибка при построении маршрута:", error);
          //   });

          // })

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
      } else {
        alert("что-то пошло не так");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
});

ymaps.ready(init);

function init(pointA, pointB) {
  function addPlacemarkByAddressTwo(address) {
    return ymaps
      .geocode(address)
      .then(function (res) {
        const firstGeoObject = res.geoObjects.get(0);
        if (firstGeoObject) {
          const coordinates = firstGeoObject.geometry.getCoordinates();
          return {
            latitude: coordinates[0],
            longitude: coordinates[1],
          };
        } else {
          throw new Error("Адрес не найден");
        }
      })
      .catch(function (error) {
        console.error("Ошибка при геокодировании адреса:", error);
        throw error;
      });
  }

  // //Использование функции
  // addPlacemarkByAddressTwo("город Тюмень, улица 50 лет октября, дом 1")
  //   .then((coords) => {
  //     console.log(
  //       `Широта: 50лет ${coords.latitude}, Долгота: ${coords.longitude}`
  //     );
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // // Coordinates of the points
  // var pointA = [55.751244, 37.618423]; // Moscow
  // var pointB = [59.93428, 30.335099]; // Saint Petersburg

  // ymaps.route([pointA, pointB]).then(
  //   function (route) {
  //     let distance = route.getLength();
  //     console.log("Distance between the points: " + distance + " meters");
  //   },
  //   function (error) {
  //     console.log("An error occurred: " + error.message);
  //   }
  // );
}
