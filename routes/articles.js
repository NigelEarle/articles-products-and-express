const express = require('express');
const Articles = require('../db/articles');
const router = express.Router();

// NO FRONT END SOLUTIONS: strictly demonstrating db, route layers

router.route('/')
  .get((req, res) => {
    return Articles.getAllArticles()
    .then(articles => {
      return res.json({ articles: articles.rows })
    })
    .catch(err => {
      return res.json(err);
    });
  })
  .post((req, res) => {
    req.body.urlTitle = encodeURI(req.body.title);

    return Articles.addNewArticle(req.body)
    .then(result => {
      // redirect to /articles
      return res.json(result);
    })
    .catch(err => {
      // redirect to /articles/new
      return res.json(err);
    })
  });

router.get('/new', (req, res) => {
  // Serve HTML new template
});

router.route('/:title')
  .get((req, res) => {
    const { title } = req.params;
    return Articles.getArticleByTitle(title)
    .then(article => {
      // single article template with article data
      return res.json({ article: article.rows })
    })
    .catch(err => {
      return res.json({ err })
    })
  })
  .put((req, res) => {
    return Articles.editArticleByTitle()
  })
  // .delete((req, res) => {
  //   return Articles.removeArticleByTitle()
  // });

// router.get('/:title/edit', (req, res) => {
//   // Server HTML edit template
// });
  
module.exports = router;
