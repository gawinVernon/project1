module.exports = (req, res) => {
  res.render('pages/login', {
    failed: req.flash('loginF')
  });
};
