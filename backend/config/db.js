const knex = require("knex")(require("../db/knexfile.js")["development"]);

module.exports = db;
