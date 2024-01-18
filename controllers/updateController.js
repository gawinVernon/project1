const Product = require('../models/Product');

module.exports = (req, res) => {
  const id = req.params.id;

  Product.findById(id).then((result) => {
    res.render('pages/update', {
      data: result,
      title: 'Update A Product',
      errors: req.flash('validationErrors')
    });
  });
};
