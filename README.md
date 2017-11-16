# Articles, Products, and Express - Oh my!

## Tests
Let the **tests drive your development** or write your tests after. The choice is up to you! As for the testing tools use:
  - [mocha](https://mochajs.org/)
  - [chai](https://chaijs.com/)
  - [supertest](https://github.com/visionmedia/supertest)
    - [supertest is built upon `superagent` so these docs will be helpful as well](https://github.com/visionmedia/superagent)

## Goal

### tl;dr
You will be building the core of a Content Management System (CMS). You will be able to create, edit, and remove content. This project will have two types of content, which will be referred to as "Resources" below, `Articles` and `Products`. For each resource you will be creating two sets of routes, a set of Endpoints which respond to POST, PUT, and DELETE methods, and another set which will serve HTML content such as a directory listing, and form for editing a resource, and a form for creating a new resource of a certain type.

Almost every website boils down to managing content.

### Technical specifications
Build an application which will have 2 resources: Products and Articles. Each resource will have an implementation of **CRUD** (create, read, update, delete) and will be RESTful. You should make use of Express' **Router** module to keep your code organized. Routes go in a directory called **routes**.

In addition, you will also have additional routes which will render **HTML** to the user. You will harness the power of the **Handlebars Template Engine** with express using [handlebars-express](https://github.com/ericf/express-handlebars) to build your templates and have them be dynamic. These templates should go in a directory called **templates**.

Each of your resources will have it's own module in charge of it's own data. This module should have helper methods for retreiving data. Keep these files in a directory named **db**.

*note: we are not using a database, having a folder called db. Later we will come back to this exercise and integrate a database. With tests already written and a db module, the refactor should go smoothly.*

[Here is a loose example of a module you'd build for `./db/articles.js`.](https://gist.github.com/sgnl/b17c4e8ac80349e23b9a)

**Project Structure Example:**
![image](https://cloud.githubusercontent.com/assets/3915598/25292586/7b79a2f0-2672-11e7-8340-fef87ff4cf80.png)

# Routes

## Product Routes
`/products`
- `POST` creates a new product
  - The incoming request will look like this: `{ name: String, price: String, inventory: String }`
    - from this request you will save your data as `{ id: Number, name: String, price: Number, inventory: Number }`
      - **id** is a unique identifier for this item. You will generate this on the server side and it will be used to access specific products with it
    - If **successful** then redirect the user back to the `/products` route.
    - If not **successful** then send the user back to the **new** product route, `/products/new` and some way to communicate the error back to the user via templating.

`/products/:id`
- `PUT` edits a product. Finds a product in a collection with the same `id` value and updates the information.
  - The incoming request will look like this: `{ id: Number, ... }`
    - `...` represents a field to be edited for example: if the server was sent `{ id: 12, name: "Water Bed" }` the server will find the product with an **id** of **12** and change the `name` property to be `"Water Bed"`.
    - If **successful** then redirect the user back to the `/products/:id` route, where `:id` is the product that was just edited, so that they can see the updated resource.
    - If not **successful** then send the user back to the **new** product route, `/products/:id/edit` and some way to communicate the error back to the user via templating.

`/products/:id`
- `DELETE` removes a product by it's **id**.
  - If **successful** then redirect the user back to the `/products` page and some way to communicate to the user that this action was successful.
  - If not **successful** then send the user back to the **new** product route, `/products/:id`, where `:id` is the product that was just edited and a message that this action was unsucessful.

======

**Routes below will output html generated from our template engine.**
Inside of your templates directory you should have the templates below in a directory called **products**

`/products`
  - `GET` responds with **HTML** generated from your template which displays all Products added thus far.
    - file name: **index.hbs**

`/products/:id`
  - `GET` responds with **HTML** generated from your template which displays the Products information for the product with the corresponding id.
    - file name: **product.hbs**

`/products/:id/edit`
  - `GET` responds with **HTML** generated from your templates.
    - The HTML should contain a form (with values already pre-filled?) so that a user can update the information for a product. This form points to your server's route for editing a product.
  - file name: **edit.hbs**

`/products/new`
  - `GET` responds with **HTML** generated from your templates.
    - The HTML should contain an empty form which a user will be able to create a new product. This form points to your server's route for creating a new product.
  - file name: **new.hbs**

## Storing Products

## Articles Routes
`/articles`
- `POST` creates a new article
  - The incoming request will look like this: `{ title: String, body: String, author: String }`
    - from this request you will save your data as `{ title: String, body: String, author: String, urlTitle: String }`
      - **title** is a unique identifier for this item.
      - **urlTitle** is similar to the **title** that was passed in but instead is a URL Encoded version. *Javascript has a native way to url-encode strings*.
        **example:** If given a title of `"The Best Magpie Developer of 2016"`, it's url-encoded equivilent is `"The%20Best%20Magpie%20Developer%20of%202016"`.
    - If **successful** then redirect the user back to the `/articles` route.
    - If not **successful** then send the user back to the **new** article route, `/articles/new` and some way to communicate the error back to the user via templating.

`/articles/:title`
- `PUT` edits a product. Finds an article in a collection with the same `title` value and updates the information.
  - The incoming request will look like this: `{ title: String, ... }`
    - `...` represents a field to be edited for example: if the server was sent `{ title: "The Best Magpie Developer of 2016" }` the server will find an article with a `title` property to be `"The Best Magpie Developer of 2016"`.
    - If **successful** then redirect the user back to the `/articles/:title` route, where `:title` is the article that was just edited, so that they can see the updated resource.
    - If not **successful** then send the user back to the **new** article route, `/article/:title/edit` and some way to communicate the error back to the user via templating.

`/articles/:title`
- `DELETE` removes a article by it's **title**.
  - If **successful** then redirect the user back to the `/articles` page and some way to communicate to the user that this action was successful.
  - If not **successful** then send the user back to the **new** article route, `/article/:title`, where `:title` is the article that was just edited and a message that this action was unsucessful.

**note:** The **title** property is mandatory. If no other key is present then update the `title`.

=======

**Routes below will output html generated from our templates.**
Inside of your templates directory you should have the templates below in a directory called **articles**

`/articles`
  - `GET` responds with **HTML** generated from your template which displays all Articles added thus far.
  - file name: **index.hbs**

`/articles/:title`
  - `GET` responds with **HTML** generated from your template which displays the Article information for the article with the corresponding title.
    - file name: **article.hbs**

`/articles/:title/edit`
  - `GET` responds with **HTML** generated from your templates.
    - The HTML should contain a form (with values already pre-filled?) so that a user can update the information for an article. This form points to your server's route for editing an article.
  - file name: **edit.hbs**

`/articles/new`
  - `GET` responds with **HTML** generated from your templates.
    - The HTML should contain an empty form which a user will be able to create a new article. This form points to your server's route for creating a new article.
  - file name: **new.hbs**


# Middleware
Here are some middleware code for you to implement.

**Analytics Tracker**
  - Scope: All incoming requests.
    - log to a file all uri that are requested. we need each request on it's own line
      - format: `[method] [uri] [timestamp]`
      - file location: all logs should go into a directory called **logs** and end with the `.log` extension
      - file name: the logs should be separated per day, please figure out a way to create a nice file name which displays date. e.g. `2016.01-17.13-45-06.log`

**Payload Validation**
  - Scope: Each Resource having it's own validator.

**Check headers on Articles**
  - Scope: Incoming requests to any `/articles` route.
    - must have the header `version: 1.0`
      - if not respond back with `{ "error": "bad headers" }`

---

# Setting up Knex.js (2nd iteration)

In the following iteration of this project, each resource will be interacting with a database and its own individual table. 

### Create database and tables

Let's start by creating a `articles-products.sql` script file in our `db` directory to create create our database and tables. 

Name your database `articles_products` and create the `articles` and `products` tables with the correct schema.

**Example SQL script structure**

```
.
├── db
│   └── products.js
│   └── articles.js
│   └── articles-products.sql
...
```

Run the script from the root of your project to create your database and tables.

```bash
$ \i db/articles-products.sql;
```

If you enter into `psql`, you should be able to see your DB and tables!

### Knex.js

Now, we need to integrate `knex.js` to help us build our tables and query them for data!

First, let's create a local database called **`articles-products`**. Now we can refer to the [knex.js setup guide](https://gist.github.com/NigelEarle/80150ff1c50031e59b872baf0e474977) and [knex.js migrations guide]( https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261) to help us get our project up and running with `knex.js`.

We will be doing our dynamic database queries using specifically the **knex.raw()** method from `knex.js` with raw SQL queries. You can refer to the official documentation for creating raw queries [here](http://knexjs.org/#Raw-Queries).

## Stretch Goal
MAKE IT PRETTY