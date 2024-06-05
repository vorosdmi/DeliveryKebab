const container = document.querySelector(".containerAll");

//! геолокация

function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getCityName(latitude, longitude);
        // console.log(`Широта: ${latitude}, Долгота: ${longitude}`);


        // Адреса для меток
        const addresses = [
          "город Тюмень, улица Мелиораторов, дом 1",
          "город Тюмень, улица Мельникайте, дом 1",
          // Добавьте другие адреса по вашему выбору
        ];


        // Создаем карту и добавляем метку
        ymaps.ready(function () {
          const myMap = new ymaps.Map("mymap", {
            center: [latitude, longitude],
            zoom: 12, //уровень приближения
          });
          // Добавляем метку на карту
          const myPlacemark = new ymaps.Placemark(
            [latitude, longitude],
            {},
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


// Функция для геокодирования адреса и добавления метки на карту
function addPlacemarkByAddress(address, map) {
  ymaps.geocode(address)
    .then(function (res) {
      const firstGeoObject = res.geoObjects.get(0);
      const coordinates = firstGeoObject.geometry.getCoordinates();

      const placemark = new ymaps.Placemark(
        coordinates,
        {},
        {
          preset: 'islands#blueDotIcon' // Стиль метки
        }
      );

      map.geoObjects.add(placemark);
    })
    .catch(function (error) {
      console.error('Ошибка при геокодировании адреса:', error);
    });
}



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
    // console.log(userLocation);

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
