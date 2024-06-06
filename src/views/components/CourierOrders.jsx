const React = require('react');

module.exports = function CourierOrders({ orders }) {
  return (
    <div className='courierOrdersContainer'>
      <h3 className="hTag" style={{fontWeight: "bold"}}>Ваши размещенные заказы</h3>
      <hr />
        <div className="orderCourier-pictures">
          {orders.map((order) => (
            <div className="order-container" id={order.id} key={order.id}>
              <img src={order.url} alt={order.name} className="orderCourier-image" />
              <span className="order-text">{order.name}</span> 
              <a href="#" className="btn btn-danger btn-sm delete">Удалить</a> 
            </div>
          ))}
        </div>
      <h3 className="createErr"></h3>
    </div>
  )
}