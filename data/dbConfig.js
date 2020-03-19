const knex = require("knex");
const config = require('../knexfile');
const environment = process.env.DB_CONNECT || "testing";

module.exports = knex(config[environment]);