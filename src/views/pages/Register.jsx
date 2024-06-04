const React = require('react');

const Layout = require('./Layout');

module.exports = function Register() {
  return (
    <Layout>
      <h2>Reg pls</h2>
      <hr />
      <form action="/register" method="POST" id="regForm">
        <label htmlFor="exampleInput1" className="form-label">
          Login
        </label>
        <input name="login" type="text" className="form-control shadow rounded" id="exampleInput1" />
        <label htmlFor="exampleInput2" className="form-label">
          Password
        </label>
        <input name="password" type="password" className="form-control shadow rounded" id="exampleInput2" />
        <button type="submit" className="btn btn-primary shadow rounded">
          Registration
        </button>
      </form>
      <h3 className="regErrMsg"></h3>
      <hr />
      <script defer src="/js/reg.js" />
    </Layout>
  );
};