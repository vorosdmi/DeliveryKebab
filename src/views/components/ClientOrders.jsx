const React = require('react');

module.exports = function ClientOrders({ orders }) {
  return (
    <div className='clientOrdersContainer'>
      <h3 className="hTag" style={{fontWeight: "bold"}}>Заказы клиентов</h3>
      <hr />
        <div className="orderClient-pictures">
          {orders.map((order) => (
            <div className="order-container" id={order.id} key={order.id}>
              <img src={order.url} alt={order.name} className="orderClient-image" />
              <span className="order-text">{order.name}</span> 
              <span className="order-text">{order.name}</span> 
              <a href="#" className="btn btn-warning btn-sm accept">Принять заказ</a> 
            </div>
          ))}
          </div>
      <h3 className="createErr"></h3>
    </div>
  )
}