const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protectedRoutes = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
      if (err) {
        // console.log(err.message);
        res.redirect('/login');
      } else {
        // console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  jwt.verify(token, 'supersecret', async (err, decodedToken) => {
    if (err) {
      // console.log(err.message);
      res.locals.user = null;
      next();
    } else {
      // console.log(decodedToken);
      let user = await User.findById(decodedToken.id);
      res.locals.user = user;
      next();
    }
  });
};

const adminRoutes = (roles) => {
  return (req, res, next) => {
    const token = jwt.verify(req.cookies.jwt, 'supersecret');
    console.log('role:' + token.id.role);
    if (!roles.includes(token.id.role)) {
      return res.status(403).json({ message: 'not admin' });
    }
    if (roles.includes(token.id.role)) next();
  };
};

module.exports = { protectedRoutes, checkUser, adminRoutes };
