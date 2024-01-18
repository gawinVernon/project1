const Product = require('../models/Product');

module.exports = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndDelete(id).then(() => {
    console.log('deleted successfully!');
    res.redirect('/products');
  });
};
