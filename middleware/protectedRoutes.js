module.exports = (req, res, next) => {
  if (!req.session.userId) {
    return setTimeout(() => {
      res.redirect('/');
    }, 1000);
  }
  next();
};
