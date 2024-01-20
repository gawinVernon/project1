const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// jwt age * 1 = cookie age * 1000
const createToken = (id) => {
  return jwt.sign({ id }, 'supersecret', {
    expiresIn: 60 * 60 * 24
  });
};

module.exports = async (req, res) => {
  const { email, password } = req.body;

  await setTimeout(() => {
    User.findOne({ email: email }).then((user) => {
      const token = createToken(user);

      if (user) {
        let cmp = bcrypt.compare(password, user.password).then((match) => {
          if (match) {
            req.session.userId = user._id;
            res.cookie('jwt', token, {
              httpOnly: true,
              maxAge: 60 * 60 * 24 * 1000
            });
            console.log(user, token);
            res.redirect('/home');
          } else if (!match) {
            req.flash('loginF', 'login failed!');
            res.redirect('/login');
          }
        });
      } else {
        req.flash('loginF', 'login failed');
        res.redirect('/login');
      }
    });
  }, 1000);
};
