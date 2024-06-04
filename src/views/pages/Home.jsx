const React = require('react');
const Layout = require('./Layout');
const Card = require("../components/Card");


module.exports = function Home({ number, user, orders }) {

  return (
    <Layout number={number}>
      <h4>Добро пожаловать в Деливери кебаб!</h4>
      <h6>Здесь вы можете выбрать и оформить себе заказ из указанного списка блюд по привлекательной цене!</h6>
<div className='map'></div>
      {/* <div className="containerAll">
         {orders.map((order) => (
           <div className="card" key={order.id}>
             <h5 className="card-title">Информация о блюде</h5>
             <br />
             <h6 className="card-text">Наименование: {order.name}</h6>
             <h6 className="card-text">Исходная цена: {order.price}</h6>
             <h6 className="card-text">Цена со скидкой: {Number(order.price) - (Number(order.price) * Number(order.discount) / 100)}</h6>
             <h6 className="card-text">Расстояние до вас: ?????</h6>
             <img src={order.img} className="card-img-topp" alt="animal" width="200" height="200"  />
             <a
                  href="#"
                  className="btn-add"
                  data-orderId={order.id}
                  data-userId={user.id}
                >
                  edit
                </a>
           </div>
         ))}
       </div> */}
       <script src='/js/home.js'></script>
    </Layout>
  );
};