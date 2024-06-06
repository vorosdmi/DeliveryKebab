const React = require("react");
const Layout = require("./Layout");

module.exports = function Cart({ number, userName, userId, orders, user }) {
  let allPrice = orders.reduce(
    (ac, el) => ac + (el.price - (el.price * el.discount) / 100),
    0
  );
  console.log("CART", orders.length);
  return (
    <Layout number={number} userName={userName} orders={orders}>
      <h3>Корзина</h3>
<div className="mainContainerCart" data-ordercards={JSON.stringify(orders)}>
      

      <div className="containerAllCart elem1">
        {orders.map((order) => (
          <div className="cardCart" key={order.id}>
            <img
              src={order.url}
              className="card-img-topp"
              alt="food"
              width="100"
              height="100"
            /> 
            
            <div className="containerMinCart">
            <h6 className="card-titleCart">{order.name}</h6>
            <h6 className="card-textCart">
              Цена отвара:{" "}
              {Number(order.price) -
                (Number(order.price) * Number(order.discount)) / 100}
            </h6>
            </div>

            <a
              href="#"
              className={"btn-del"}
              data-orderid={order.id}
              data-userid={userId}
              data-price={
                Number(order.price) -
                (Number(order.price) * Number(order.discount)) / 100
              }
            >
              X
            </a>
          </div>
        ))}
      </div>

      <div className="elem2">
      {orders.length === 0 ? (
        <h5>В вашей корзине пусто...</h5>
      ) : (
        <h5 className="allCost" data-allprice={allPrice}>
          Итоговая стоимость: <span className="priceValue">{allPrice}.руб</span>
        </h5>
      )}

      <button
        className={orders.length === 0 ? "elementHiddn" : "placeOrder"}
        data-userid={userId}
      >
        оформить заказ
      </button>
      </div>

      </div>
      <script src="/js/cart.js"></script>
    </Layout>
  );
};
