const React = require('react');
const Layout = require('./Layout');
const NewOrder = require('../components/NewOrder');
const CourierOrders = require('../components/CourierOrders');
const ClientOrders = require('../components/ClientOrders');

module.exports = function Courier({ number, userName, courierOrders, clientOrders, isCourier }) {
  return (
    <Layout number={number} userName={userName} isCourier={isCourier}>
      <div className="floating-container">
        <NewOrder />
      </div>
      <span style={{ margin: '10px' }} />
      <div className="orders-container">
        <div className="courier-floating-container">
          <CourierOrders orders={courierOrders} />
        </div>
        <div className="client-floating-container">
         <ClientOrders orders={clientOrders} />
         </div>
      </div>
      <script type="module" src="/js/newCourierOrder.js"></script>
      <script src="/js/changeCourierOrder.js"></script>
    </Layout>
  )
}