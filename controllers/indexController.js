module.exports = (req, res) => {
  console.log(req.session);
  res.render('pages/index', {
    title: 'Home Page'
  });
};
