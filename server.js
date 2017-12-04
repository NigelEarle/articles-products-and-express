const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;
const articles = require('./routes/articles');
const products = require('./routes/products');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/articles', articles);
app.use('/products', products);

app.listen(PORT, (err) => {
  console.log(`Server listening on port: ${PORT}`);
});