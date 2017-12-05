const knex = require('../knex');

class Products {
  constructor() {

  }

  getAllProducts() {
    return knex.raw('select * from products');
  }

  addNewProduct(body) {
    if (!this.validate(body)) return Promise.reject('Invalid body data');

    return knex.raw(`insert into products(name, price, inventory)
      values ('${body.name}', ${parseFloat(body.price)}, ${parseInt(body.inventory)} )`
    );
  }

  getProductById(id) {
    if (!id) return Promise.reject('Must pass in product id');

    return knex.raw(`select * from products where id = ${id}`);
  }

  editProductById(id, body) {
    if (!this.validate(body)) return Promise.reject('Invalid body data');

    return knex.raw(`update products
      set name = '${body.name}', price = ${parseFloat(body.price)}, inventory = ${parseInt(body.inventory)}
      where id = ${id}`
    );
  }

  removeProductById() {

  }

  validate(body) {
    if (!body.name || !body.price || !body.inventory) return false;
    return true;
  }

}

module.exports = new Products;
