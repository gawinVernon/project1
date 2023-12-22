module.exports = (req, res, next) => {
  if (req.session.userId) {
    return setTimeout(() => {
      res.redirect('/home');
    }, 1000);
  }
  next();
};
