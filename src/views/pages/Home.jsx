const React = require("react");
const Layout = require("./Layout");
const Card = require("../components/Card");

module.exports = function Home({ number, userName, userId, orders, ordersCart }) {
 //? имеющиеся адреса для меток
  const courierAddresses = orders.map(order => order.courierAddress+';');

  return (
    <Layout number={number} userName={userName} userId={userId} orders={ordersCart} isCourier={false}>
      <div className="containerMap" data-addresses={courierAddresses} data-number={number} data-userid={userId} data-ordercards={JSON.stringify(ordersCart)}>
        <h1 id="mainTitle">Добро пожаловать в <span class="highlight">Деливери кебаб</span></h1>
        <h8>
          Выберите и оформите себе заказ из указанного списка
          блюд по привлекательной цене!
        </h8>
      </div>
      <div className="containerMinMap" >
        <div className="map" id="mymap"></div>

        <div className="text-map">
          {/* На карте вы можете <br />
          посмотреть, где находятся близжайшие от вас заказы */}
          <div className="containerAll" data-allorders={JSON.stringify(orders)} />
        </div>
      </div>
      <script src="/js/home.js"></script>
    </Layout>
  );
};




