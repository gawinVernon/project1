module.exports = (req, res) => {
  let name = '';
  let price = '';
  let data = req.flash('data')[0];

  if (typeof data != 'undefined') {
    name = data.name;
    price = data.price;
  }

  res.render('pages/create', {
    title: 'Create A Product',
    errors: req.flash('validationErrors'),
    name: name,
    price: price
  });
};
