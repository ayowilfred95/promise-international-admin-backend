const Sequelize = require("sequelize");
// const { Sequelize: mysql } = require("mysql2");
require("dotenv").config();

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, DB_HOST, POSTGRES_PORT } = process.env;

/**
 * @dev  Use thid config with Docker
 */

const sequelize = new Sequelize({
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: DB_HOST,
  port: POSTGRES_PORT,
  dialect: "postgres",
});

module.exports = sequelize;
