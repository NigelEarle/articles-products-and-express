DROP DATABASE IF EXISTS articles_products;

CREATE DATABASE articles_products;

\c articles_products;

CREATE TABLE articles (
  id serial PRIMARY KEY,
  title varchar(255) NOT NULL,
  body text NOT NULL,
  author varchar(255) NOT NULL,
  urlTitle text NOT NULL
);

CREATE TABLE products (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  price int() NOT NULL,
  inventory int() NOT NULL
);
