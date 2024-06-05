const React = require('react');
const Layout = require('./Layout');
const Card = require("../components/Card");


module.exports = function Home({ number, userName, userId, orders }) {
 
  return (
    <Layout number={number} userName={userName} userId={userId}>
      <h4>Добро пожаловать в Деливери кебаб!</h4>
      <h6>Здесь вы можете выбрать и оформить себе заказ из указанного списка блюд по привлекательной цене!</h6>
<div className='map' id='mymap'>

{/* <script type="text/javascript" charset="utf-8" src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A053bd947d462cc1a45aeba4070defff75501905071c0eaf68436ac9976ec698c&amp;lang=ru_RU&amp;apikey=<513313f4-6089-4a80-b442-af1d3277a73e>"></script> */}
</div>
      <div className="containerAll">
         {orders.map((order) => (
           <div className="card" key={order.id}>
             <h5 className="card-title">{order.name}</h5>
            
             <h6 className="card-text">Исходная цена: {order.price}p.</h6>
             <h6 className="card-text">Цена со скидкой: {Number(order.price) - (Number(order.price) * Number(order.discount) / 100)}</h6>
             <h6 className="card-text">Расстояние до вас: ?????</h6>
             <img src={order.url} className="card-img-topp" alt="food" width="200" height="200"  />
             <a 
                  href="#"
                  className={number ? "btn-add" : "elementHiddn"}
                 data-location=''
                  data-orderid={order.id}
                   data-userid={userId}
                >
                  добавить в корзину
                </a>
           </div>
         ))}
       </div>

       <script src='/js/home.js'></script>
    </Layout>
  );
};