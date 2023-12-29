const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
  name: {
    required: [true, 'please provide product name!'],
    type: String,
    validate: {
      validator: async function (name) {
        const product = await this.constructor.findOne({ name });
        if (product) {
          if (this.id === name.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: () => 'this name has already been used.'
    }
  },
  price: {
    required: [true, 'the price must be from 1 to 9999'],
    type: Number,
    min: 1,
    max: 9999
  }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
