const User = require('../models/User');

module.exports = (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  })
    .then(() => {
      console.log('user registered successfully!');
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error);

      if (error) {
        const validationErrors = Object.keys(error.errors).map(
          (key) => error.errors[key].message
        );
        req.flash('validationErrors', validationErrors);
        // req.flash('data', req.body);

        return res.redirect('/register');
      }
    });
};
