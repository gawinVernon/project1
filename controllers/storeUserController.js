const User = require('../models/User');

module.exports = (req, res) => {
  User.create(req.body)
    .then(() => {
      console.log('user registered successfully!');
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error.errors);
    });
};
