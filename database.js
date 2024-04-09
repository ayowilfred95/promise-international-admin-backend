const Sequelize = require("sequelize");
// const { Sequelize: mysql } = require("mysql2");
require("dotenv").config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

/**
 * @dev  Use thid config with Docker
 */

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
});





module.exports = sequelize;
