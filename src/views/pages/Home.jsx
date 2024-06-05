const React = require("react");
const Layout = require("./Layout");
const Card = require("../components/Card");

module.exports = function Home({ number, userName, userId, orders }) {
  console.log(orders);
  return (
    <Layout number={number} userName={userName} userId={userId}>
      <div className="containerMap">
        <h4>Добро пожаловать в Деливери кебаб!</h4>
        <h6>
          Здесь вы можете выбрать и оформить себе заказ из указанного списка
          блюд по привлекательной цене!
        </h6>
      </div>
      <div className="containerMinMap">
        <div className="map" id="mymap"></div>

        <div className="text-map">
          На карте вы можете <br />
          посмотреть, где находятся близжайшие от вас заказы
        </div>
      </div>

      <div className="containerAll">
        {orders.map((order) => (
          <div className="card" key={order.id}>
            <h5 className="card-title">{order.name}</h5>

            <h6 className="card-text">Исходная цена: {order.price}p.</h6>
            <h6 className="card-text">
              Цена со скидкой:{" "}
              {Number(order.price) -
                (Number(order.price) * Number(order.discount)) / 100}
            </h6>
            <h6 className="card-text">Расстояние до вас: ?????</h6>
            <h6 className="card-text">Местоположение: {order.courierAddress}</h6>
            <img
              src={order.url}
              className="card-img-topp"
              alt="food"
              width="200"
              height="200"
            />
            <a
              href="#"
              className={number ? "btn-add" : "elementHiddn"}
              data-location=""
              data-orderid={order.id}
              data-userid={userId}
            >
              добавить в корзину
            </a>
          </div>
        ))}
      </div>

      <script src="/js/home.js"></script>
    </Layout>
  );
};
