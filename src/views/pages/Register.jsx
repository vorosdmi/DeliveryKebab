const React = require("react");

const Layout = require("./Layout");

module.exports = function Register() {
  return (
    <Layout>
      <div className="contPage">
      <div className="contReg">
      <h3>
        Добро пожаловать! <br />
        Давайте зарегистрируемся
      </h3>
      <hr />
      <form action="/register" method="POST" id="regForm">
        <label htmlFor="exampleInput1" className="form-label">
          Name
        </label>
        <input
          name="name"
          type="text"
          className="form-control shadow rounded"
          id="exampleInput1"
        />
        <label htmlFor="exampleInput2" className="form-label">
          Phone number
        </label>
        <input
          name="number"
          type="text"
          className="form-control shadow rounded"
          placeholder="* 8/+7-XXX-XXX-XX-XX"
          id="exampleInput2"
        />

<label htmlFor="exampleInput3" className="form-label">
          Email
        </label>
        <input
          name="email"
          type="email"
          className="form-control shadow rounded"
          id="exampleInput3"
        />

        <label htmlFor="exampleInput2" className="form-label">
          Password
        </label>
        <input
          name="password"
          type="password"
          className="form-control shadow rounded"
          id="exampleInput3"
        />
<br />
        <button type="submit" className="btn btn-primary shadow rounded">
          Registration
        </button>
      </form>
      <h3 className="regErrMsg"></h3>
      <hr />
      </div>
      </div>
      <script defer src="/js/reg.js" />
    </Layout>
  );
};
