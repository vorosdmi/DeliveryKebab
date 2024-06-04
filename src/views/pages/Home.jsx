const React = require('react');
const Layout = require('./Layout');
const Card = require("../components/Card");


module.exports = function Home({ login, cards }) {
  const newTasks = cards.map((el) => (
      <Card key={el.id} card={el} />
));

  return (
    <Layout login={login}>
      
      {login ? (<div>
        <h1>Hello {login}</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {newTasks}
        </div>
      </div>
        
      ) : (
        <h1>Hello User, reg pls</h1>
      )
    }
    </Layout>
  );
};