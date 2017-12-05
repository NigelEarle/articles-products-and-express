const express = require('express');
const Products = require('../db/products');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    return Products.getAllProducts()
    .then(products => {
      return res.json({ products: products.serialize() })
    })
    .catch(err => {
      return res.json(err);
    })
  })
  .post((req, res) => {
    return Products.addNewProduct()
  });

router.get('/new', (req, res) => {
});

router.route('/:id')
  .get((req, res) => {

  })
  .put((req, res) => {

  })
  .delete((req, res) => {

  });

router.get('/:id/edit', (req, res) => {});

module.exports = router;