const React = require('react');
const Layout = require('./Layout');

module.exports = function Courier({ login, orders }) {
  return(
    <Layout login={login}>
      <div className='mainContainer'>
        <div className='courierOrders'>MY ORDERS</div>
        <div className='clintOrders'>CLIENT ORDERS</div>
        <div className='newOrder'>NEW ORDER</div>
        {/* <div className="farms-container">
          <h3>All farms: </h3>
          {farms.length > 0 ? (
            <ul>
              {farms.map((farm) => (
                <li id={farm.id} key={farm.id}>
                  <span className='nameFarm'> 
                    <a href={`/farm/${farm.id}`} style={{ textDecoration: 'underline' }}>{farm.name}</a>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <span>No farms yet...</span>
          )
          }
        </div>
        {login ? (
          <div className="pets-container">
            <h3>My pets: </h3>
            <div className="pet-pictures">
              {pets.length > 0 ? (
                  pets.map((pet) => (
                    <Pet pet={pet} isOwner={false}/>
                  ))
              ) : (
                <span>No pets yet...</span>
              )
              }
            </div>
        </div>
        ) : null
        }        */}
      </div>
    </Layout>
  )
}