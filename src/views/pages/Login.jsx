const React = require('react');

const Layout = require('./Layout');

module.exports = function Login() {
  return (
    <Layout>
      <h2 className="hTag">Login please</h2>
      <hr />
      <form action="/login" method="POST" id="loginForm">
        <label htmlFor="exampleInput1" className="form-label" >Login</label>
        <input name="login" type="text" className="form-control shadow rounded" id="exampleInput1" />
        {/* placeholder="example@yahooooo.com" к примеру можно что-то тип того, если будете regExp на email@email делать */}
        <label htmlFor="exampleInput2" className="form-label">Password</label>
        <input name="password" type="password" className="form-control shadow rounded" id="exampleInput2" />
        <button type="submit" className="btn btn-primary shadow rounded">Login</button>
      </form>
      <hr />
    </Layout>
  );
};