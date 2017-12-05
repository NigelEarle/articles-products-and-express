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
    const encodedTitle = encodeURI(req.body.title);
    req.body.urlTitle = encodedTitle;

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
    const { title } = req.params;
    const encodedTitle = encodeURI(req.body.title);
    req.body.urlTitle = encodedTitle;

    return Articles.editArticleByTitle(title, req.body)
    .then(result => {
      // redirect to /articles/:title - use encodedTitle
      return res.json(result);
    })
    .catch(err => {
      // redirect to /articles/:title/edit
      return res.json(err);
    })
  })
  .delete((req, res) => {
    const { title } = req.params;
    return Articles.removeArticleByTitle(title)
    .then(result => {
      // redirect to /articles
      return res.json(result);
    })
    .catch(err => {
      // redirect to /articles/:title
      return res.json(err);
    })
  });

router.get('/:title/edit', (req, res) => {
  // Serve HTML edit template with articles
  const { title } = req.params;

  return Articles.getArticleByTitle(title)
  .then(article => {
    return res.json({ article: article.rows })
  })
  .catch(err => {
    return res.json(err);
  })
});
  
module.exports = router;
