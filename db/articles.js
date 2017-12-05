const knex = require('../knex');

class Articles {
  constructor() {
  }

  getAllArticles() {
    return knex.raw('select * from articles');
  }

  addNewArticle(body) {
    if (!this.validate(body)) return Promise.reject('Invalid body data');

    return knex.raw(`insert into articles(title, body, author, urlTitle) values ('${body.title}', '${body.body}', '${body.author}', '${body.urlTitle}')`)
  }

  getArticleByTitle(title) {
    return knex.raw(`select * from articles where title = '${title}'`)
  }

  editArticleByTitle(body) {
    if (!this.validate(body)) return Promise.reject('Invalid body data');

    return knex.raw(`update articles
      set title = ${body.title}, body = ${body.body}, author = ${body.author}, urlTitle = ${body.urlTitle}
      where title = ${body.title}`
    );
  }

  removeArticleByTitle(title) {
    return knex.raw(`delete from articles where title = ${title}`)
  }

  validate(body) {
    if (!body.title || !body.body || !body.author || !body.urlTitle) return false;
    return true;
  }

}

module.exports = new Articles;