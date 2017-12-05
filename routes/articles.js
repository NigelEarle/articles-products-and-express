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

router.get('/new', (req, res) => {
  // Serve HTML new template
});

router.route('/:title')
  .get((req, res) => {
    return Articles.getArticleByTitle()
  })
  .put((req, res) => {
    return Articles.editArticleByTitle()
  })
  .delete((req, res) => {
    return Articles.removeArticleByTitle()
  });

router.get('/:title/edit', (req, res) => {
  // Server HTML edit template
});
  
module.exports = router;
