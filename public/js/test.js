
//! геолокация
const ymaps = window.ymaps;

function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getCityName(latitude, longitude);
        // console.log(`Широта: ${latitude}, Долгота: ${longitude}`);

        // Создаем карту и добавляем метку
        ymaps.ready(function () {
          const myMap = new ymaps.Map("mymap", {
            center: [latitude, longitude],
            zoom: 12, //уровень приближения
            //controls: ["routePanelControl"],
          });

          container.addEventListener("click", async (e) => {
            if (e.target.classList.contains("btn-add")) {
              const courierlocation = e.target.dataset.courierlocation
              const userId = e.target.dataset.userid;
              const userLocation = e.target.dataset.location;
              const orderId = e.target.dataset.orderid;

              let route = ymaps
              .route([
                [latitude, longitude],
                {
                  type: "viaPoint",
                  point: [latitude, longitude],
                },
                `${courierlocation}`,
              ])
              .then(
                function (route) {
                  // myMap.geoObjects.add(route)
//! сохраняем в датасет расстояние
                  const routeLength = route.getLength() / 1000;
                  e.target.dataset.odrerlocation = routeLength.toFixed(2)
                  const orderLocation = e.target.dataset.odrerlocation

                console.log('???? ', e.target.dataset.odrerlocation);
                },
                function (error) {
                  console.log(error);
                }
              );
               }

           })

         

          //! Добавляем my метку на карту
          const myPlacemark = new ymaps.Placemark(
            [latitude, longitude],
            { hintContent: `Я тут!` },
            {
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

module.exports = getLocation