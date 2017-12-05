const knex = require('../knex');

class Products {
  constructor() {

  }

  getAllProducts() {
    return knex.raw('select * from products');
  }

  addNewProduct(body) {
    if (!this.validate(body)) return Promise.reject('Invalid body data');
    
    return knex.raw(`INSERT INTO products(name, price, inventory)
      VALUES ('${body.name}', ${parseFloat(body.price)}, ${parseInt(body.inventory)} )`
    );
  }

  getProductById() {

  }

  updateProductById() {

  }

  removeProductById() {

  }

  validate(body) {
    if (!body.name || !body.price || !body.inventory) return false;
    return true;
  }

}

module.exports = new Products;
