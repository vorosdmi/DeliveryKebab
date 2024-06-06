"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Orders",
      [
        {
          name: "gkj",
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Terrine_de_saumon_au_basilic.JPG/500px-Terrine_de_saumon_au_basilic.JPG",
          price: 1200,
          discount: 30,
          courierId: null,
          courierAddress: "город Тюмень, улица Мелиораторов, дом 1",
          clientId: null,
          clientAddress: null,
          isAccepted: false,
          
        },
        {
          name: "gkj",
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Foods.jpg/400px-Foods.jpg",
          price: 1200,
          discount: 30,
          courierId: null,
          courierAddress: "город Тюмень, улица Мельникайте, дом 1",
          clientId: null,
          clientAddress: null,
          isAccepted: false,
          
        },
        {
          name: "gkj",
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mashrooms_on_varena_roadside.jpg/500px-Mashrooms_on_varena_roadside.jpg",
          price: 1200,
          discount: 30,
          courierId: null,
          courierAddress: "город Тюмень, улица Республики, дом 1",
          clientId: null,
          clientAddress: null,
          isAccepted: false,
          
        },
        {
          name: "gkj",
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Meatfoodgroup.jpg/500px-Meatfoodgroup.jpg",
          price: 1200,
          discount: 30,
          courierId: null,
          courierAddress: "город Тюмень, улица Федюнинского, дом 1",
          clientId: null,
          clientAddress: null,
          isAccepted: false,
          
        },
        {
          name: "gkj",
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Italian_ice_cream.jpg/500px-Italian_ice_cream.jpg",
          price: 1200,
          discount: 30,
          courierId: null,
          courierAddress: "город Тюмень, улица Молодежная, дом 1",
          clientId: null,
          clientAddress: null,
          isAccepted: false,
          
        },
        {
          name: "gkj",
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Schweinsbraten-1.jpg/440px-Schweinsbraten-1.jpg",
          price: 1200,
          discount: 30,
          courierId: null,
          courierAddress: "город Тюмень, улица 50 лет октября, дом 1",
          clientId: null,
          clientAddress: null,
          isAccepted: false,
          
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
