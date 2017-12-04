const express = require('express');
const Articles = require('../db/articles');
const router = express.Router();

router.get('/', (req, res) => {
  return Articles.getAllArticles()
  .then(articles => {
    return res.json({ articles: articles.serialize() })
  })
  .catch(err => {
    return res.json(err);
  });
});

module.exports = router;