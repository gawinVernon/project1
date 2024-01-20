const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res) => {
  req.flash('loginS', 'login successfully!');
  res.render('pages/home', {
    title: 'Home',
    success: req.flash('loginS')
  });
};
