module.exports = (req, res) => {
  let email = '';
  let password = '';
<<<<<<< HEAD
=======
  let passwordConfirm = '';
>>>>>>> b721722 (15/1)
  let data = req.flash('data')[0];

  if (typeof data != 'undefined') {
    email = data.email;
    password = data.password;
  }

  res.render('pages/register', {
    errors: req.flash('validationErrors'),
    email: email,
<<<<<<< HEAD
    password: password
=======
    password: password,
    passwordConfirm: passwordConfirm
>>>>>>> b721722 (15/1)
  });
};
