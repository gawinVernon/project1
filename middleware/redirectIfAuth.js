const redirectIfAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    return setTimeout(() => {
      res.redirect('/home');
    }, 1000);
  }
  next();
};

module.exports = { redirectIfAuth };
