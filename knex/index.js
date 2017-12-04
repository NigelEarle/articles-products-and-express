// This file used to make queries because it chains directly off of initial knex instance.
const environment = process.env.ENVIRONMENT || 'development';
const config = require('../knexfile.js')[environment]
module.exports = require('knex')(config);