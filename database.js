const Sequelize = require("sequelize");
require("dotenv").config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

/**
 * @dev  Use thid config with Docker
 */

const sequelize = new Sequelize('railway', 'postgres', 'CDACBAb11EG6dAeb*eE6-5-dbfG-6c6b', {
  port: '23821',
  host: 'roundhouse.proxy.rlwy.net',
  dialect: "postgres",
});


module.exports = sequelize;
