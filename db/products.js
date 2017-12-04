const knex = require('../knex');

class Products {
  constructor() {

  }

  getAllProducts() {
    return knex.raw('select * from products');
  }

  addNewProduct() {

  }

  getProductById() {

  }

  updateProductById() {

  }

  removeProductById() {

  }

}

module.exports = new Products;
