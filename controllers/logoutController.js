module.exports = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  req.session.destroy(() => {
    res.redirect('/');
  });
};
