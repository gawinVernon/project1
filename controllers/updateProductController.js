const Product = require('../models/Product');

module.exports = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  })
    .then(() => {
      console.log('updated successfully!');
      res.redirect('/products');
    })
    .catch((error) => {
      console.log(error);
    });
};
