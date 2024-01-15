const Product = require('../models/Product');

module.exports = (req, res) => {
  Product.create(req.body)
    .then(() => {
      console.log('product created successfully!');
      res.redirect('/products');
    })
    .catch((error) => {
      // console.log(error);
      if (error) {
        const validationErrors = Object.keys(error.errors).map(
          (key) => error.errors[key].message
        );
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);

        return res.redirect('/create');
      }
    });
};
