const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

<<<<<<< HEAD
=======
// ./api/v1

>>>>>>> b721722 (15/1)
//Post Method
router.post('/post', async (req, res) => {
  const data = new Product({
    name: req.body.name,
    price: req.body.price
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get('/getAll', async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Product.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
