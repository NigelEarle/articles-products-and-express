const express = require('express');
const Articles = require('../db/articles');
const router = express.Router();

router.route('/')
  .get('/', (req, res) => {
    return Articles.getAllArticles()
    .then(articles => {
      return res.json({ articles: articles.serialize() })
    })
    .catch(err => {
      return res.json(err);
    });
  })
  .post((req, res) => {
    return Articles.addNewArticle()
  });

router.get('/new', (req, res) => {});

router.route('/:title')
  .get((req, res) => {

  })
  .put((req, res) => {

  })
  .delete((req, res) => {

  });

router.get('/:title/edit', (req, res) => {});
  
module.exports = router;