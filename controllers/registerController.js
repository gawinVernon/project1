module.exports = (req, res) => {
  let email = '';
  let password = '';
  let passwordConfirm = '';
  let data = req.flash('data')[0];

  if (typeof data != 'undefined') {
    email = data.email;
    password = data.password;
  }

  res.render('pages/register', {
    errors: req.flash('validationErrors'),
    email: email,
    password: password,
    passwordConfirm: passwordConfirm
  });
};
