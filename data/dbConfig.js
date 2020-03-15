const knex = require("knex");
const config = require('../knexfile');
const environment = process.env.DB_CONNECT || "development";

module.exports = knex(config[environment]);