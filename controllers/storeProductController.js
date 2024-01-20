const Product = require('../models/Product');

module.exports = async (req, res) => {
  await Product.create({
    name: req.body.name,
    price: req.body.price
  })
    .then(() => {
      console.log('product created successfully!');
      res.redirect('/products');
    })
    .catch((error) => {
      console.log(error);

      if (error) {
        // const validationErrors = Object.keys(error.errors).map(
        //   (key) => error.errors[key].message
        // );
        // req.flash('validationErrors', validationErrors);
        // req.flash('data', req.body);

        return res.redirect('/create');
      }
    });
};
