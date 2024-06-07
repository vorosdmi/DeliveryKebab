const React = require("react");

//* условная верстка для navBar
module.exports = function Layout({
  children,
  number,
  userName,
  userId,
  orders,
  isCourier
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          type="image/x-icon"
          href="/assets/favicon.ico"
          rel="shortcut icon"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
          crossOrigin="anonymous"
        />
        <script
          src="https://api-maps.yandex.ru/2.1/?apikey=513313f4-6089-4a80-b442-af1d3277a73e&lang=ru_RU"
          type="text/javascript"
        ></script>
        <link rel="stylesheet" href="/css/style.css" />
        <title>KuKu</title>
        {/* <script
          src="https://api-maps.yandex.ru/2.1/?&amp;id=mymap&amp;lang=ru_RU&amp;apikey=513313f4-6089-4a80-b442-af1d3277a73e"
          type="text/javascript"
        ></script> */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap" rel="stylesheet"/>
      </head>
      <header>
        {number ? (
          <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
            <div className="container-fluid">
              <span className="navbar-brand" href="/">
                Hello, <span className="name">{userName}!</span>
              </span>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      Home
                    </a>
                  </li>
                  {!isCourier ? (
                  <li className="nav-item">
                    <a className="nav-link cartNav" href={`/cart/${userId}`}>
                      {orders.length === 0 ? (
                        "корзина"
                      ) : (
                        <>
                          корзина
                          <span className="text_cart">({orders.length})</span>
                        </>
                      )}
                    </a>
                  </li>
                ) : null}
                </ul>
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <a className="nav-link logout" href="/logout">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        ) : (
          <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                Home
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/register">
                      Registration
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}
      </header>
      <body>
        {children}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
};
