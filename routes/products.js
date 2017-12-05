const express = require('express');
const Products = require('../db/products');
const router = express.Router();

// NO FRONT END SOLUTIONS: strictly demonstrating db, route layers
router.route('/')
  .get((req, res) => {
    return Products.getAllProducts()
    .then(products => {
      // send index template with all products from db
      return res.json({ products: products.serialize() })
    })
    .catch(err => {
      return res.json(err);
    })
  })
  .post((req, res) => {
    console.log(req.body)
    return Products.addNewProduct(req.body)
    .then(result => {
      // redirect to GET /products route
      return res.json(result);
    })
    .catch(err => {
      // redirect back to GET /products/new with error
      return res.json(err)
    })
  });

router.get('/new', (req, res) => {
  // Serve HTML new template
});

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;

    return Products.getProductById(id)
    .then(product => {
      // respond with product template with product data
      return res.json(product);
    })
    .catch(err => {
      return res.json(err)
    });

  })
  .put((req, res) => {
    const { id } = req.params;

    return Products.editProductById(id, req.body)
    .then(result => {
      // redirect 
      return res.json(result);
    })
    .catch(err => {
      return res.json(err);
    });

  })
  .delete((req, res) => {
    return Products.removeProductById()
  });

router.get('/:id/edit', (req, res) => {
  const { id } = req.params;

  return Product.getProductById(id)
  .then(product => {
    // serve template with product data
    return res.json(product);
  })
  .catch(err => {
    return res.json(err);
  });
});

module.exports = router;
