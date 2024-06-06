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
          courierId: 1,
          courierAddress: null,
          clientId: null,
          clientAddress: null,
          isAccepted: false,
          
        },
        {
          name: "gkj",
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Foods.jpg/400px-Foods.jpg",
          price: 1200,
          discount: 30,
          courierId: 1,
          courierAddress: null,
          clientId: null,
          clientAddress: null,
          isAccepted: false,
          
        },
        {
          name: "gkj",
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mashrooms_on_varena_roadside.jpg/500px-Mashrooms_on_varena_roadside.jpg",
          price: 1200,
          discount: 30,
          courierId: 1,
          courierAddress: null,
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
          courierAddress: null,
          clientId: null,
          clientAddress: null,
          isAccepted: false,
          
        },
        {
          name: "gkj",
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Italian_ice_cream.jpg/500px-Italian_ice_cream.jpg",
          price: 1200,
          discount: 30,
          courierId: 1,
          courierAddress: null,
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
          courierAddress: null,
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
