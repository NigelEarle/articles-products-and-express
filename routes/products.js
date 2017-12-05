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
  // Serve HTML new template
});

router.route('/:id')
  .get((req, res) => {
    return Products.getProductById()
  })
  .put((req, res) => {
    return Products.editProductById()
  })
  .delete((req, res) => {
    return Products.removeProductById()
  });

router.get('/:id/edit', (req, res) => {
  // Server HTML edit template
});

module.exports = router;
