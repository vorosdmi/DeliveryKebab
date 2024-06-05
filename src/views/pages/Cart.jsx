const React = require('react');
const Layout = require('./Layout');



module.exports = function Cart({ number, userName, userId, orders, user }) {
    let allPrice = orders.reduce((ac, el) => ac + (el.price-el.price*el.discount/100), 0)
  return (
   
    <Layout number={number} userName={userName}>
      <h3>Корзина</h3>

      <div className="containerAll">
         {orders.map((order) => (
           <div className="card" key={order.id}>
             
             <img src={order.url} className="card-img-topp" alt="food" width="100" height="100"  />
             <h6 className="card-title">{order.name}</h6>
             <h6 className="card-text">Цена отвара: {Number(order.price) - (Number(order.price) * Number(order.discount) / 100)}</h6>
             <a 
                  href="#"
                  className={"btn-del"}
                 
                  data-orderid={order.id}
                   data-userid={userId}
                   data-price={Number(order.price) - (Number(order.price) * Number(order.discount) / 100)}
                   
                >
                  удалить из корзины
                </a>
                
           </div>
         ))}
       </div> 
       {orders.length===0 ? (
        <h5>В вашей корзине пусто...</h5>
       ): (
        <h5 className='allCost' data-allprice={allPrice}>Итоговая стоимость: {allPrice}.руб</h5>
       )}

<button className='placeOrder' data-userid={userId} >оформить заказ</button>
       <script src='/js/cart.js'></script>
    </Layout>
  );
};