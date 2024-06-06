const React = require('react');
const Layout = require('./Layout');
const NewOrder = require('../components/NewOrder');
const CourierOrders = require('../components/CourierOrders');
const ClientOrders = require('../components/ClientOrders');

module.exports = function Courier({ number, userName, courierOrders, clientOrders }) {
  return (
    <Layout number={number} userName={userName}>
      <NewOrder />
      <div className="orders-container">
        <CourierOrders orders={courierOrders} />
        <ClientOrders orders={clientOrders} />
      </div>
      <script type="module" src="/js/newCourierOrder.js"></script>
      <script src="/js/changeCourierOrder.js"></script>
    </Layout>
  )
}