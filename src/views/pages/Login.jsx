const React = require("react");

const Layout = require("./Layout");

module.exports = function Login() {
  return (
    <Layout>
      <div className="contPage">
      <div className="contReg">
      <h3 className="hTag">
        Пожалуйста, введите ваш <br />
        номер телефона и пароль
      </h3>
      <hr />
      <form action="/login" method="POST" id="loginForm">
        <label htmlFor="exampleInput1" className="form-label">
          Phone number
        </label>
        <input
          name="number"
          type="text"
          className="form-control shadow rounded"
          placeholder="* 8/+7-XXX-XXX-XX-XX"
          id="exampleInput1"
        />
        {/* placeholder="example@yahooooo.com" к примеру можно что-то тип того, если будете regExp на email@email делать */}
        <label htmlFor="exampleInput2" className="form-label">
          Password
        </label>
        <input
          name="password"
          type="password"
          className="form-control shadow rounded"
          id="exampleInput2"
        />
        <button type="submit" className="btn btn-primary shadow rounded">
          Войти
        </button>
      </form>
      <h3 className="loginErr"></h3>
      <hr />
      </div>
      </div>
      <script src="/js/login.js"></script>
    </Layout>
  );
};
