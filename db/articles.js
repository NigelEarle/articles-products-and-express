const knex = require('../knex');

class Articles {
  constructor() {

  }

  getAllArticles() {
    return knex.raw('select * from articles');
  }

  addNewArticle() {

  }

  getArticleByTitle() {

  }

  updateArticleByTitle() {

  }

  removeArticleByTitle() {

  }

}

module.exports = new Articles;