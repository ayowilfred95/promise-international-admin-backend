const Sequelize = require("sequelize");
require("dotenv").config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Configuration that follows the file
// const sequelize = new Sequelize('ulegong_school_db','ulegong_promise_db','} ',{
//     host: 'localhost',
//     dialect: 'mysql'
// })

/**
 * @dev  Use thid config with Docker
 */

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
});

// const sequelize = new Sequelize('alimisam_new-promise-db','alimisam_new_promise','promise@new',{
//     host: 'localhost',
//     dialect: 'mysql'
// })

module.exports = sequelize;
