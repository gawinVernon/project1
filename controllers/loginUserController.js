const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  await setTimeout(() => {
    User.findOne({ email: email }).then((user) => {
      console.log(user);
      if (user) {
        let cmp = bcrypt.compare(password, user.password).then((match) => {
          if (match) {
            req.session.userId = user._id;
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
