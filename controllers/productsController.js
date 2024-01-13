const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

module.exports = (req, res) => {
  const product = Product.find()
    .sort({ price: -1 })
    .then((result) => {
      res.render('pages/products', {
        title: 'Products',
        product: result
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
