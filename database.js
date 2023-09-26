const Sequelize = require('sequelize')
require('dotenv').config();

const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

/**
 * @dev  Use thid config with Docker 
 */

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
  });




// const sequelize = new Sequelize('alimisam_new-promise-db','alimisam_new_promise','promise@new',{
//     host: 'localhost',
//     dialect: 'mysql'
// })


module.exports = sequelize;
