function checkUser(req, res, next) {
    if (req.session.number) {
      next();
    } else {
      res.redirect('/');
    }
  }
  
  function secureRoute(req, res, next) {
    if (!req.session.number) {
      next();
    } else {
      res.redirect('/');
    }
  }
  
function checkUserCart(req, res, next) {
  
  if (req.session.userId === +req.params.id) {
    next();
  } else {
    res.redirect('/');
  }
}


  module.exports = { checkUser, secureRoute, checkUserCart };