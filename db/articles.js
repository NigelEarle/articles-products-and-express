const knex = require('../knex');

class Articles {
  constructor() {

  }

  getAllArticles() {
    return knex.raw('select * from articles');
  }

  addNewArticle() {

  }

  getArticleById() {

  }

  updateArticleById() {

  }

  removeArticleById() {

  }

}

module.exports = new Articles;